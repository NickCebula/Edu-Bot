// src/pages/LandingPage.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import screenshot1 from "../assets/screenshot1.webp";

const LandingPage = () => (
  <div className="landing-container">
    <HeroSection />

    <section className="features container">
      <FeatureCard
        title="Learn"
        description="Interactive lessons that adapt to you."
      />
      <FeatureCard
        title="Play"
        description="Earn rewards as you master new skills."
      />
      <FeatureCard
        title="Track"
        description="See your progress at a glance."
      />
    </section>

    <section className="screenshots container">
      <h2>Take a Look Inside</h2>
      <div className="screenshot-grid">
        {[screenshot1].map((src, i) => (
          <div key={i} className="screenshot-card">
            <img src={src} alt={`App screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>

    <footer className="footer container">
      <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
    </footer>
  </div>
);

export default LandingPage;
