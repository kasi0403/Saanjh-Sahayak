import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportCard from './ReportCard';
import PredictionCard from './PredictionCard';

const ReportsDisplay = () => {
  const { reportId } = useParams();
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/reportData/${reportId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching report data:', error);
      }
    };
    fetchData();
  }, [reportId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Resident's Report</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <ReportCard 
            title="Medical Report" 
            content={JSON.stringify(reportData.reportPdf, null, 2)} 
          />
          <PredictionCard />
          <ReportCard 
            title="Doctor's Note" 
            content={reportData.docNote} 
          />
          <ReportCard 
            title="Diet Plan" 
            content={reportData.dietPlan} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsDisplay;
