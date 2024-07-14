import React from 'react';

const ReportCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default ReportCard;
