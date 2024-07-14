import React, { useState } from 'react';
import axios from 'axios';

const UploadReport = ({ onReportData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset error when a new file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError(null);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onReportData(response.data.details); // Ensure this is the correct path
    } catch (error) {
      setError('Error uploading file. Please try again.');
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold text-center">Upload Report</h2>
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <input type="file" onChange={handleFileChange} className="block w-full text-m text-gray-700 mb-4" />
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Report'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;
