import React from "react";
import HomePage from "./pages/HomePage.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import Projects from "./pages/Projects.jsx";
import Achievements from "./pages/Achievements.jsx";
import ContactMe from "./pages/ContactMe.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <HomePage />
      <AboutMe />
      <Projects />
      <Achievements />
      <ContactMe />
    </div>
  );
}

export default App;