import React, { useEffect } from "react";
import "./Achievements.css";

const Achievements = () => {
  useEffect(() => {
    // Add active class to make section visible
    const achievementsSection = document.querySelector('#achievements');
    if (achievementsSection) {
      achievementsSection.classList.add('active');
    }
  }, []);

  // Achievement data based on CV information
  const achievements = [
    {
      id: 1,
      title: "Most Outstanding Player of the Year",
      organization: "CCC School of Cricket",
      date: "2018",
      description: "Recognized for exceptional performance, leadership skills, and sportsmanship throughout the cricket season. Led the team to multiple tournament victories while maintaining the highest batting average.",
      image: "/images/cricket.jpg", // You'll need to add these images
      highlights: [
        "Captained the team to regional championship victory",
        "Highest batting average in the league",
        "Demonstrated exceptional leadership and team building skills"
      ],
      certificateLink: "#"
    },
    {
      id: 2,
      title: "Member of Provincial Cricket Team",
      organization: "Sri Lanka Cricket Association",
      date: "2020",
      description: "Selected to represent Team Colombo in the provincial cricket championship organized by Sri Lanka Cricket Association. Contributed to Team Colombo's victory as the champion side through strong performance and teamwork.",
      image: "/images/cricketteam.jpg",
      highlights: [
        "Key player in Team Colombo's championship-winning campaign",
        "Demonstrated exceptional batting skills throughout the tournament",
        "Selected after rigorous trials against top cricket talent in the region"
      ],
      certificateLink: "#"
    },
    {
      id: 3,
      title: "Man of the Semi-Final & Final",
      organization: "Nelson Mendis Challenge Trophy",
      date: "2019",
      description: "Received dual match honors as Man of the Semi-Final and Man of the Final in the prestigious Nelson Mendis Challenge Trophy cricket tournament. Delivered exceptional all-round performances in the crucial knockout stages to lead the team to championship victory.",
      image: "/images/crickettrophy.jpg",
      highlights: [
        "Match-winning batting performance in the semi-final with highest run score",
        "Decisive bowling spell in the final that turned the match in our favor",
        "Demonstrated exceptional pressure handling in crucial match situations"
      ],
      certificateLink: "#"
    },
   
  ];

  return (
    <section id="achievements" className="achievements-section">
      <div className="achievements-container">
        <div className="section-title-container">
          <h2 className="section-title">Achievements</h2>
          <div className="title-underline"></div>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-image">
                <img 
                  src={achievement.image} 
                  alt={achievement.title} 
                />
              </div>
              
              <div className="achievement-content">
                <div className="achievement-date">{achievement.date}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <div className="achievement-organization">
                  <i className="fas fa-building"></i>
                  {achievement.organization}
                </div>
                
                <p className="achievement-description">{achievement.description}</p>
                
                <div className="achievement-highlights">
                  {achievement.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <div className="highlight-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="highlight-text">{highlight}</div>
                    </div>
                  ))}
                </div>
                
                <a href={achievement.certificateLink} className="view-certificate">
                  <i className="fas fa-certificate"></i>
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;