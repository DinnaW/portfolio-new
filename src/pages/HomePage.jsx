import React from "react";
import TrueFocus from "../components/TrueFocus.jsx";
import RotatingText from "../components/RotatingText.jsx";
import Threads from "../components/Threads.jsx";
import "./HomePage.css";

const HomePage = () => {
  // Hardcoded approach specifically for your GitHub Pages site with nested path
  const imagePath = '/portfolio-new/images/profile.jpg';

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">DW</div>
        <div className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      
      <section className="hero-section">
        {/* Threads background */}
        <div className="hero-threads-background">
          <Threads
            color={[0, 0.64, 1]} // Matches your highlight-blue color
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>
        
        <div className="hero-content">
          <div className="greeting">Hello, I'm</div>
          <div className="name-focus">
            <TrueFocus
              sentence="Dinura Wanigasekara"
              manualMode={false}
              blurAmount={5}
              borderColor="#00A3FF"
              glowColor="rgba(0, 163, 255, 0.6)"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>
          <div className="title-rotation">
            <span className="i-am">I am a </span>
            <RotatingText
              texts={['Full Stack Developer', 'Frontend Specialist', 'React Developer', 'Java Developer']}
              mainClassName="title-rotating-text"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
          <div className="hero-description">
            A passionate developer with experience in building robust, user-focused applications that drive business results.
          </div>
          <div className="hero-buttons">
            <button className="btn primary">View Projects</button>
            <button className="btn secondary">Contact Me</button>
          </div>
          <div className="social-links">
            <a href="https://github.com/DinnaW" target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/dinurawanigasekara-3822282b7/" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:dinura.20231495@iit.ac.lk">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="image-container">
            <div className="blue-glow"></div>
            <img
              src={imagePath}
              alt="Dinura Wanigasekara"
              className="profile-image"
            />
            <div className="profile-outline"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;