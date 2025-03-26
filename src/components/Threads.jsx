import { useEffect, useRef, useState, useCallback } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

import "./Threads.css";

// Simplified vertex shader (unchanged)
const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Significantly optimized fragment shader
const fragmentShader = `
precision mediump float; // Downgraded from highp to mediump for better performance

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

// Reduced line count for better performance
const int u_line_count = 10; // Further reduced from 20 to 10
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

// Simplified Perlin noise function
float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

// Optimized line function
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;
    
    // Simplified noise calculation (using only one Perlin noise call)
    float xnoise = Perlin2D(vec2(time_scaled, st.x + perc) * 2.5);

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const Threads = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  lowPerformanceMode = true, // Default to low performance mode
  ...rest
}) => {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const programRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // Start with not visible
  const [isInitialized, setIsInitialized] = useState(false);
  const mouseRef = useRef({ current: [0.5, 0.5], target: [0.5, 0.5] });
  const frameCountRef = useRef(0);

  // More efficient throttled render function
  const throttledRender = useCallback((time) => {
    if (!rendererRef.current || !meshRef.current || !programRef.current) return;
    
    programRef.current.uniforms.iTime.value = time * 0.001;
    rendererRef.current.render({ scene: meshRef.current });
  }, []);

  // Setup intersection observer to disable rendering when not visible
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const isNowVisible = entries[0].isIntersecting;
        setIsVisible(isNowVisible);
        
        // Initialize WebGL only when component becomes visible
        if (isNowVisible && !isInitialized) {
          setIsInitialized(true);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '100px' // Preload a bit before becoming visible
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isInitialized]);

  // WebGL setup - only initialize when visible
  useEffect(() => {
    if (!containerRef.current || !isInitialized) return;
    
    const container = containerRef.current;

    // Calculate appropriate scaling factor based on performance mode
    const scaleFactor = lowPerformanceMode ? 0.4 : 0.7; // More aggressive downscaling
    
    // Create renderer with optimized settings
    const renderer = new Renderer({ 
      alpha: true,
      powerPreference: 'low-power',
      antialias: false,
      depth: false, // Disable depth testing (not needed)
      stencil: false, // Disable stencil buffer (not needed)
      width: container.clientWidth * scaleFactor,
      height: container.clientHeight * scaleFactor
    });
    rendererRef.current = renderer;
    
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Set canvas styles for better performance
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.imageRendering = lowPerformanceMode ? 'pixelated' : 'auto';
    
    container.appendChild(gl.canvas);

    // Create geometry, program, and mesh
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            container.clientWidth * scaleFactor,
            container.clientHeight * scaleFactor,
            container.clientWidth / container.clientHeight
          ),
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    // Debounced resize function for better performance
    let resizeTimeout;
    function debouncedResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isVisible || !container) return;
        
        const newWidth = container.clientWidth * scaleFactor;
        const newHeight = container.clientHeight * scaleFactor;
        
        renderer.setSize(newWidth, newHeight);
        
        program.uniforms.iResolution.value.r = newWidth;
        program.uniforms.iResolution.value.g = newHeight;
        program.uniforms.iResolution.value.b = newWidth / newHeight;
      }, 200); // 200ms debounce
    }
    
    window.addEventListener("resize", debouncedResize);

    // More efficient mouse handling
    function handleMouseMove(e) {
      if (!isVisible) return;
      
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.target = [x, y];
    }
    
    function handleMouseLeave() {
      mouseRef.current.target = [0.5, 0.5];
    }
    
    if (enableMouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation variables
    let lastFrameTime = 0;
    const frameInterval = lowPerformanceMode ? 1000/20 : 1000/60; // 20 FPS in low perf mode
    const frameSkip = lowPerformanceMode ? 3 : 1; // Skip more frames in low performance mode

    // Optimized animation loop
    function update(timestamp) {
      // Skip update if not visible
      if (!isVisible) {
        animationFrameId.current = requestAnimationFrame(update);
        return;
      }
      
      // Frame rate limiting
      const delta = timestamp - lastFrameTime;
      if (delta < frameInterval) {
        animationFrameId.current = requestAnimationFrame(update);
        return;
      }
      
      lastFrameTime = timestamp - (delta % frameInterval);
      frameCountRef.current++;
      
      // Only update on certain frames to improve performance
      if (frameCountRef.current % frameSkip === 0) {
        // Update mouse with smoothing
        if (enableMouseInteraction) {
          const smoothing = 0.05;
          mouseRef.current.current[0] += smoothing * (mouseRef.current.target[0] - mouseRef.current.current[0]);
          mouseRef.current.current[1] += smoothing * (mouseRef.current.target[1] - mouseRef.current.current[1]);
          program.uniforms.uMouse.value[0] = mouseRef.current.current[0];
          program.uniforms.uMouse.value[1] = mouseRef.current.current[1];
        }
        
        throttledRender(timestamp);
      }
      
      animationFrameId.current = requestAnimationFrame(update);
    }
    
    // Start animation loop
    if (isVisible) {
      animationFrameId.current = requestAnimationFrame(update);
    }

    // Thorough cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);

      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      
      // Properly release WebGL resources
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      
      rendererRef.current = null;
      meshRef.current = null;
      programRef.current = null;
    };
  }, [color, amplitude, distance, enableMouseInteraction, isVisible, isInitialized, lowPerformanceMode, throttledRender]);

  return <div ref={containerRef} className="threads-container" {...rest} />;
};

export default Threads;