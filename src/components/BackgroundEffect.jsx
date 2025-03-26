import React, { useEffect, useRef } from "react";
import "./BackgroundEffect.css";

/**
 * A lightweight canvas-based background effect to replace the WebGL Threads component
 * @param {Object} props - Component props
 * @param {Array} props.color - RGB color array [r, g, b] where values are 0-1
 * @param {number} props.amplitude - Controls the movement intensity (default: 1)
 * @param {number} props.density - Controls the number of particles (default: 0.03)
 * @param {boolean} props.enableMouseInteraction - Whether to enable mouse interaction (default: false)
 * @param {string} props.className - Additional CSS classes
 */
const BackgroundEffect = ({
  color = [0, 0.64, 1], // Default blue color
  amplitude = 1,
  density = 0.03,
  enableMouseInteraction = false,
  className = "",
  ...rest
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const [r, g, b] = color;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;
    
    // Convert RGB 0-1 values to CSS rgba strings
    const baseColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}`;
    
    // Particles with different sizes, speeds, and opacities
    const particles = [];
    const particleCount = Math.min(width * density, 120); // Reasonable limit
    
    // Create particles with different shapes and behaviors
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 8 + 2;
      const opacity = Math.random() * 0.4 + 0.1;
      
      // Determine particle type (circle, triangle, line)
      const type = Math.random() > 0.7 ? 'triangle' : Math.random() > 0.5 ? 'line' : 'circle';
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: size,
        speedX: (Math.random() - 0.5) * 0.5 * amplitude,
        speedY: (Math.random() - 0.5) * 0.5 * amplitude,
        opacity: opacity,
        type: type,
        // Special properties for triangle
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01 * amplitude,
        // Pulsating effect
        pulseDirection: 1,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseAmount: Math.random() * 0.2 + 0.8,
        // Color variations (mostly in the chosen color's tones)
        color: Math.random() > 0.8 ? 
          `${baseColor}, ${opacity})` : 
          `rgba(${Math.round(r * 255 * (Math.random() * 0.3 + 0.7))}, 
                ${Math.round(g * 255 * (Math.random() * 0.4 + 0.6))}, 
                ${Math.round(b * 255 * (Math.random() * 0.3 + 0.7))}, 
                ${opacity})`
      });
    }
    
    // Mouse interaction variables
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseInfluenceRadius = 100;
    
    if (enableMouseInteraction) {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
    }
    
    // Handle resize
    const handleResize = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Background gradients for depth
    const createGradients = () => {
      // Create linear gradient
      const linearGradient = ctx.createLinearGradient(0, 0, width, height);
      linearGradient.addColorStop(0, '#0A192F'); // Dark blue
      linearGradient.addColorStop(1, '#112240'); // Slightly lighter blue
      
      // Create radial gradient
      const radialGradient = ctx.createRadialGradient(
        width * 0.2, height * 0.3, 0,
        width * 0.2, height * 0.3, width * 0.7
      );
      radialGradient.addColorStop(0, 'rgba(17, 34, 64, 0.4)');
      radialGradient.addColorStop(1, 'rgba(10, 25, 47, 0.9)');
      
      return { linearGradient, radialGradient };
    };
    
    // Draw background gradients
    const drawBackground = () => {
      const { linearGradient, radialGradient } = createGradients();
      
      // Fill with linear gradient
      ctx.fillStyle = linearGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Overlay with radial gradient for depth
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);
    };
    
    // Draw particle based on its type
    const drawParticle = (particle) => {
      ctx.fillStyle = particle.color;
      
      if (particle.type === 'circle') {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (particle.type === 'triangle') {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(particle.size, particle.size);
        ctx.lineTo(-particle.size, particle.size);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      } else if (particle.type === 'line') {
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size / 3;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
          particle.x + Math.cos(particle.rotation) * particle.size * 2, 
          particle.y + Math.sin(particle.rotation) * particle.size * 2
        );
        ctx.stroke();
      }
    };
    
    // Apply mouse interaction to particle
    const applyMouseInfluence = (particle) => {
      if (!enableMouseInteraction) return;
      
      // Calculate distance from mouse
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply force if within influence radius
      if (distance < mouseInfluenceRadius) {
        const force = (1 - distance / mouseInfluenceRadius) * 0.02 * amplitude;
        particle.speedX += dx * force;
        particle.speedY += dy * force;
      }
      
      // Apply drag to prevent excessive speed
      particle.speedX *= 0.98;
      particle.speedY *= 0.98;
    };
    
    // Update particle position and properties
    const updateParticle = (particle) => {
      // Apply mouse influence
      applyMouseInfluence(particle);
      
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Pulsate size
      particle.size += particle.pulseSpeed * particle.pulseDirection;
      if (particle.size < particle.pulseAmount * 0.5 || particle.size > particle.pulseAmount * 1.5) {
        particle.pulseDirection *= -1;
      }
      
      // Rotate triangles
      particle.rotation += particle.rotationSpeed;
      
      // Wrap around screen
      if (particle.x < -50) particle.x = width + 50;
      if (particle.x > width + 50) particle.x = -50;
      if (particle.y < -50) particle.y = height + 50;
      if (particle.y > height + 50) particle.y = -50;
    };
    
    // Animation function
    const animate = () => {
      // Draw background
      drawBackground();
      
      // Update and draw particles
      particles.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle);
      });
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', () => {});
      }
    };
  }, [r, g, b, amplitude, density, enableMouseInteraction]);

  return (
    <div 
      ref={containerRef} 
      className={`background-effect-container ${className}`} 
      {...rest}
    >
      <canvas ref={canvasRef} className="background-effect-canvas" />
    </div>
  );
};

export default BackgroundEffect;