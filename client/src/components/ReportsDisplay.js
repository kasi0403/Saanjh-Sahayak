import React from 'react';
import ReportCard from './ReportCard';
import PredictionCard from './PredictionCard';

const ReportsDisplay = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Resident's report</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <ReportCard 
            title="Medical report" 
            content="This is where the full medical report content will be displayed. It will occupy a larger section of the page to accommodate all necessary details."
          />
          <PredictionCard />
          <ReportCard 
            title="Doctor's Note" 
            content="This is where the doctor's note content will be displayed. It will occupy a slightly smaller section compared to the medical report."
          />
          <ReportCard 
            title="Diet Plan" 
            content="This is where the diet plan content will be displayed. It will also occupy a slightly smaller section."
          />
        </div>
      </div>
    </div>
  );
}

export default ReportsDisplay;
