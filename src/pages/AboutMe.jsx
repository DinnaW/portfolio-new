import React, { useEffect } from "react";
import ScrollReveal from '../components/ScrollReveal';
import "./AboutMe.css";

const AboutMe = () => {
  useEffect(() => {
    // Add active class to make section visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.classList.add('active');
    }
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="section-title-container">
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={8}
              containerClassName="about-scroll-reveal"
              textClassName="about-paragraph"
            >
              I'm a dedicated Full-Stack Developer with a passion for building robust, user-focused applications
              that drive business results. With a strong foundation in both frontend and backend technologies,
              I transform complex requirements into innovative, user-friendly solutions.
            </ScrollReveal>

            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={-2}
              blurStrength={6}
              containerClassName="about-scroll-reveal"
              textClassName="about-paragraph"
              wordAnimationEnd="bottom bottom-=10%"
            >
              Currently pursuing my BSc in Computer Science at Informatics Institute of Technology,
              I'm constantly enhancing my skills through practical projects and continuous learning.
              My development journey is driven by curiosity and a commitment to excellence.
            </ScrollReveal>

            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={2}
              blurStrength={7}
              containerClassName="about-scroll-reveal"
              textClassName="about-paragraph"
              wordAnimationEnd="bottom bottom-=20%"
            >
              Beyond coding, I'm an avid cricket player and badminton enthusiast, having captained
              teams and earned recognition as "The Most Outstanding Player of the Year" at CCC school of cricket.
              These experiences have honed my leadership skills and teamwork abilities.
            </ScrollReveal>
          </div>

          <div className="skills-container">
            <h3 className="skills-title">Technical Expertise</h3>
            
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Frontend</h4>
                <ul className="skills-list">
                  <li>React.js</li>
                  <li>Angular</li>
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Backend</h4>
                <ul className="skills-list">
                  <li>Java</li>
                  <li>Node.js</li>
                  <li>Spring Boot</li>
                  <li>MongoDB</li>
                  <li>Git</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h4>Soft Skills</h4>
                <ul className="skills-list">
                  <li>Communication</li>
                  <li>Leadership</li>
                  <li>Team Work</li>
                  <li>Adaptability</li>
                  <li>Time Management</li>
                </ul>
              </div>
            </div>
            
            <div className="quote-container">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="quote-scroll-reveal"
                textClassName="quote-text"
              >
                "I believe in creating digital experiences that not only meet requirements but exceed expectations. 
                My goal is to build applications that make a meaningful impact and leave a lasting impression."
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;