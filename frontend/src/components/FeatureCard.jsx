import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    {icon && <div className="feature-card__icon">{icon}</div>}
    <h3 className="feature-card__title">{title}</h3>
    <p className="feature-card__desc">{description}</p>
  </div>
);

export default FeatureCard;
