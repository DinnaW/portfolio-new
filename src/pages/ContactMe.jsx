import React, { useState, useEffect } from "react";
import Threads from "../components/Threads.jsx";
import "./ContactMe.css";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Add active class to make section visible
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.classList.add('active');
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Form is valid, show success message
      // In a real application, you would send form data to a server here
      setFormSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 5000);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-background">
        <Threads
          color={[0, 0.64, 1]}
          amplitude={0.5}
          distance={0.3}
          enableMouseInteraction={true}
        />
      </div>
      
      <div className="contact-container">
        <div className="section-title-container">
          <h2 className="section-title">Contact Me</h2>
          <div className="title-underline"></div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-header">
              <h3>Let's Connect</h3>
              <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
            </div>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-details">
                  <h4>Location</h4>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="info-details">
                  <h4>Email</h4>
                  <p>dinura.20231495@iit.ac.lk</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="info-details">
                  <h4>Phone</h4>
                  <p>+94 71 234 5678</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <h4>Follow Me</h4>
              <div className="social-icons">
                <a href="https://github.com/DinnaW" target="_blank" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/dinurawanigasekara-3822282b7/" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <div className="input-container">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={formErrors.name ? "error" : ""}
                    />
                  </div>
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-container">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={formErrors.email ? "error" : ""}
                    />
                  </div>
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject (Optional)</label>
                  <div className="input-container">
                    <i className="fas fa-bookmark"></i>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <div className="input-container textarea-container">
                    <i className="fas fa-comment-alt"></i>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows="6"
                      className={formErrors.message ? "error" : ""}
                    ></textarea>
                  </div>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>

                <button type="submit" className="submit-btn">
                  <span>Send Message</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <p>&copy; {new Date().getFullYear()} Dinura Wanigasekara. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ContactMe;