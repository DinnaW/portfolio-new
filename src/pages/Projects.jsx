import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./Projects.css";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Mental Health App - MindBridge",
      description: "A comprehensive mental health application that helps users track their mood, practice mindfulness, and connect with licensed therapists. The app features daily check-ins, guided meditation sessions, progress tracking, and secure messaging with mental health professionals.",
      technologies: ["Flutter", "Node.js", "MongoDB", "Express", "Firebase"],
      image: "/images/MindBridge.jpg",
      features: ["Mood tracking and journaling", "Guided meditation and breathing exercises", "Therapist matching and secure messaging", "Progress visualization and insights", "Community support forums"],
      github: "https://github.com/yourusername/mindease",
      link: "https://mindease-app.netlify.app"
    },
    {
      id: 2,
      title: "Real Time Online Ticketing System",
      description: "A comprehensive ticketing platform that allows users to browse events, purchase tickets, and receive digital tickets with QR codes. Includes admin panel for event organizers with analytics and ticket verification tools.",
      technologies: ["React", "Node js", "MySQL", "JWT Authentication", "Stripe API"],
      image: "/images/ticketingnew.jpg",
      features: ["Real-time seat selection", "Secure payment processing", "Digital ticket generation", "QR code validation", "Admin dashboard with analytics"],
      github: "https://github.com/yourusername/online-ticketing"
    },
    {
      id: 3,
      title: "Property Listing Website",
      description: "A modern real estate platform that connects buyers, sellers, and agents. Features include property listings with advanced search functionality, virtual tours, mortgage calculator, and agent contact forms.",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "Google Maps API"],
      image: "/images/propertylisting.jpg",
      features: ["Advanced property search filters", "Interactive map view", "Virtual property tours", "Mortgage calculation tools", "Favorite properties list"],
      github: "https://github.com/yourusername/property-listing"
    },
    {
      id: 4,
      title: "Plane Management System",
      description: "A comprehensive aviation management software for flight scheduling, aircraft maintenance tracking, crew management, and passenger information. Designed for small to medium-sized airlines and charter companies.",
      technologies: ["Java", "JavaFX", "MySQL", "JUnit", "Maven"],
      image: "/images/projects/plane-management.jpg",
      features: ["Flight scheduling and tracking", "Maintenance records management", "Crew scheduling and certification tracking", "Passenger manifests and seating", "Fuel calculation and optimization"],
      github: "https://github.com/yourusername/plane-management"
    },
    {
      id: 5,
      title: "Bank Management System",
      description: "A secure banking system with account management, transaction processing, and reporting capabilities. Implements industry-standard security practices and provides both customer and admin interfaces.",
      technologies: ["Java", "Spring Framework", "Hibernate", "PostgreSQL", "Spring Security"],
      image: "/images/projects/bank-system.jpg",
      features: ["Account creation and management", "Secure transaction processing", "Interest calculation", "Loan application and management", "Financial reporting and statements"],
      github: "https://github.com/yourusername/bank-management"
    },
    {
      id: 6,
      title: "Online Shopping Website",
      description: "A feature-rich e-commerce platform with product catalog, shopping cart, secure checkout, and order tracking. Includes admin panel for inventory management and sales analytics.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      image: "/images/ecommerce.jpg",
      features: ["Product catalog with categories and filters", "User accounts and profile management", "Shopping cart and wishlist", "Secure checkout process", "Order tracking and history"],
      github: "https://github.com/yourusername/online-shopping"
    }
  ];

  const handleNextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = (activeProject + 1) % projects.length;
    animateProjectChange(nextIndex);
  };

  const handlePrevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prevIndex = activeProject === 0 ? projects.length - 1 : activeProject - 1;
    animateProjectChange(prevIndex);
  };

  const handleProjectClick = (index) => {
    if (isAnimating || index === activeProject) return;
    setIsAnimating(true);
    animateProjectChange(index);
  };

  const animateProjectChange = (newIndex) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(newIndex);
        setIsAnimating(false);
      }
    });

    tl.to(".project-content", { opacity: 0, y: 50, duration: 0.5 })
      .to(".project-image", { opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.5");
  };

  useEffect(() => {
    if (!isAnimating) {
      gsap.fromTo(
        ".project-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
      gsap.fromTo(
        ".project-image",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }
      );
    }
  }, [activeProject, isAnimating]);

  const project = projects[activeProject];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-title-container">
          <h2 className="section-title">Projects</h2>
          <div className="title-underline"></div>
        </div>

        <div className="project-showcase">
          <button className="nav-arrow prev-arrow" onClick={handlePrevProject}>
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="project-display">
            <div className="project-image-container">
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400?text=Project+Image";
                  }}
                />
              </div>
            </div>

            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-features">
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="project-tech">
                <h4>Technologies Used</h4>
                <div className="tech-stack">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="project-link github">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link live">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          <button className="nav-arrow next-arrow" onClick={handleNextProject}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="project-pagination">
          {projects.map((_, index) => (
            <span
              key={index}
              className={`pagination-dot ${index === activeProject ? "active" : ""}`}
              onClick={() => handleProjectClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;