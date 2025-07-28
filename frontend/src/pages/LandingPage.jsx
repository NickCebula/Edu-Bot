import React, { useState } from 'react';
import NavBarHome from '@/components/NavBarHome';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeatureSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ParentSection from '@/components/ParentSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      alert("Thanks for signing up! We'll be in touch soon.");
      setEmail('');
    } catch (err) {
      console.error('Signup error:', err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <NavBarHome />
      <HeroSection email={email} setEmail={setEmail} onSubmit={handleEmailSubmit} isSubmitting={isSubmitting} />
      <FeaturesSection />
      <HowItWorksSection />
      <ParentSection />
      <CTASection email={email} setEmail={setEmail} onSubmit={handleEmailSubmit} isSubmitting={isSubmitting} />
      <Footer />
    </div>
  );
}
