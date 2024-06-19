import React, { useState } from 'react';
import UploadReport from '../components/UploadReport';
import EditableForm from '../components/EditableForm';

export default function Form() {
  const [reportData, setReportData] = useState(null);

  return (
    <div>
      {reportData ? (
        <EditableForm initialData={reportData} />
      ) : (
        <UploadReport onReportData={setReportData} />
      )}
    </div>
  );
}