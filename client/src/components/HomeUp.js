import React from 'react';
import './HomeUp.css';

const HomeUp = () => {
  return (
    <div className="container">
      <div className="text-section">
        <h2>Saanjh Sahayak</h2>
        <p>
          A home for the elderly. Embracing the digital era, with the integration of an LLM model, we empower
          caregivers to efficiently analyze health data, enabling proactive and personalized care. Welcome to a place where
          age is celebrated, and every moment is cherished.
        </p>
      </div>
      <div className="image-section">
        <img
          src="https://res.cloudinary.com/duwadnxwf/image/upload/v1713446592/Home_ymfk2d.png"
          alt="Placeholder Image"
        />
      </div>
    </div>
  );
};

export default HomeUp;
