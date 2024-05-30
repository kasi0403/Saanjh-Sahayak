// src/components/UploadReport.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadReport = ({ onReportData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onReportData(response.data.details); // Ensure this is the correct path
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={{ display:'flex',justifyContent:'center',marginTop:'3rem' }}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <div>
        <button type="button" class="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-3 py-2 text-center me-2 mb-2" onClick={handleUpload}>Upload Report</button>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;
