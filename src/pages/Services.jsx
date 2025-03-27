import React, { useEffect } from "react";
import Threads from "../components/Threads.jsx";
import "./Services.css";

const Services = () => {
  useEffect(() => {
    // Add active class to make section visible
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.classList.add('active');
    }

    // Initialize intersection observer for revealing services on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all service cards
    document.querySelectorAll('.service-card').forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Services data - simplified with just 4 services
  const services = [
    {
      id: 1,
      icon: "fa-code",
      title: "Web Development",
      description: "Creating responsive and dynamic websites that deliver exceptional user experiences across all devices.",
      color: "#00A3FF"
    },
    {
      id: 2,
      icon: "fa-mobile-alt",
      title: "Mobile App Development",
      description: "Building native and cross-platform mobile applications that engage users and drive business growth.",
      color: "#4D96FF"
    },
    {
      id: 3,
      icon: "fa-server",
      title: "Backend Development",
      description: "Developing robust server-side applications and APIs that power your digital solutions reliably and securely.",
      color: "#23AFCD"
    },
    {
      id: 4,
      icon: "fa-paint-brush",
      title: "UI/UX Design",
      description: "Crafting intuitive interfaces and seamless user experiences that delight users and achieve business objectives.",
      color: "#00CFBB"
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-background">
        <Threads
          color={[0, 0.64, 1]}
          amplitude={0.5}
          distance={0.3}
          enableMouseInteraction={true}
        />
      </div>
      
      <div className="services-container">
        <div className="section-title-container">
          <h2 className="section-title">My Services</h2>
          <div className="title-underline"></div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrap" style={{ backgroundColor: `${service.color}10` }}>
                <div className="service-icon" style={{ color: service.color, boxShadow: `0 0 0 8px ${service.color}20` }}>
                  <i className={`fas ${service.icon}`}></i>
                </div>
              </div>
              
              <h3 className="service-title" style={{ color: service.color }}>{service.title}</h3>
              
              <p className="service-description">{service.description}</p>
              
              <div className="card-decoration top-left" style={{ backgroundColor: service.color }}></div>
              <div className="card-decoration bottom-right" style={{ backgroundColor: service.color }}></div>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <div className="cta-content">
            <h3>Need a custom solution?</h3>
            <p>Let's discuss how I can help bring your vision to life</p>
          </div>
          <a href="#contact" className="cta-button">
            <span>Get in Touch</span>
            <i className="fas fa-paper-plane"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;