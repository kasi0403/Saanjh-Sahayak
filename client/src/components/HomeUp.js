import React from 'react';
import './HomeUp.css'

const HomeUp = () => {
  return (
    <div className=" flex items-center justify-center mx-7 font-sans ...">
      <div className="w-1/2 p-2">
        <h2 className="text-3xl font-bold mb-4 ">Saanjh Sahayak</h2>
        <p className="text-gray-700">
          A home for the elderly. Embracing the digital era, with the integration of an LLM model, we empower 
          caregivers to efficiently analyze health data, enabling proactive and personalized care. Welcome to a place where
          age is celebrated, and every moment is cherished.
        </p>
      </div>
      {/* Image on the right */}
      
      <div className="w-1/2">
        <img
          className="object-cover object-center rounded-lg"
          src="https://res.cloudinary.com/duwadnxwf/image/upload/v1713446592/Home_ymfk2d.png"
          alt="Placeholder Image"
        />
      </div>
    </div>
 );
};

export default HomeUp;
