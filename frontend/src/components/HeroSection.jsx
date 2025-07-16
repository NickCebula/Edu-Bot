// src/components/LandingPage.jsx
import React from 'react';
import HeroSection from './HeroSection';
//import FeatureCard from './FeatureCard';
import screenshot1 from '../assets/screenshot1.webp'
// import screenshot2 from '../assets/screenshot2.png';
// import screenshot3 from '../assets/screenshot3.png';

const LandingPage = () => (
  <div className="landing-container">
    {/* Hero */}
    <HeroSection />

    {/* Features Section */}
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

    {/* Screenshots Gallery */}
    <section className="screenshots container">
      <h2>Take a Look Inside</h2>
      <div className="screenshot-grid">
        {[screenshot1, screenshot2, screenshot3].map((src, i) => (
          <div key={i} className="screenshot-card">
            <img src={src} alt={`App screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="footer container">
      <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
    </footer>
  </div>
);

export default LandingPage;
