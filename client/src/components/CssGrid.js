import React, { useState } from 'react';
import dataArray from '../dataArray';

export const CssGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const boxStyle =
    'bg-neutral-300 border-2 rounded-xl p-2  flex flex-col items-center justify-center transform transition-transform duration-300';

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  return (
    <div className="max-w-10xl mx-20 grid md:grid-cols-3 auto-rows-[220px] gap-4 my-10">
      {dataArray.map((item, i) => (
        <div
          key={i}
          className={`${boxStyle} ${
            i === 0 || i === 5 ? 'md:col-span-2' : ''
          } ${i === 4 ? 'md:row-span-2' : ''} ${
            hoveredIndex === i ? 'hover:scale-110  z-40' : 'opacity-50'
          }`}
          onMouseMove={() => handleHover(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img src={item.image} className="h-10 w-10 object-cover" alt={item.name} />
          <h2 className="text-xl text-grey-900 font-bold">{item.name}</h2>
          <p className="text-sm font-light font-10">{item.description}</p>
        </div>
      ))}
    </div>
  );
};
