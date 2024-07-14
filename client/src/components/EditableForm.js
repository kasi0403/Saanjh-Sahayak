import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getWeekNumber = () => {
  const currentDate = new Date();
  return currentDate;
};

const EditableForm = ({ selectedPatientId, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e, path) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    let nested = updatedFormData;
    for (let i = 0; i < path.length - 1; i++) {
      nested = nested[path[i]];
    }
    nested[path[path.length - 1]] = value;

    setFormData(updatedFormData);
  };

  const renderFields = (data, path = []) => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      const currentPath = [...path, key];

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key}>
            <strong className="block mt-2 mb-1 text-base font-semibold text-gray-700">{key}</strong>
            {renderFields(value, currentPath)}
          </div>
        );
      } else {
        return (
          <div key={key} className="flex mb-2 text-sm">
            <div className="flex items-center justify-center w-36 text-black font-medium bg-blue-300 rounded-md p-1.5">
              {key}
            </div>
            <div className="flex-1 pl-4 bg-gray-100 rounded-md p-1.5">
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={(e) => handleInputChange(e, currentPath)}
                  className="w-full bg-gray-100 text-black font-medium rounded-md p-1.5"
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          </div>
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const weekNumber = getWeekNumber();
      const dataToSave = { ...formData, userId: selectedPatientId, date: weekNumber };
      const response = await axios.post('http://localhost:8080/api/submit', dataToSave);
      toast.success('Report submitted successfully!');
      console.log('Save response:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error submitting report. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:8080/save', formData);
      toast.success('Report saved successfully!');
      console.log('Save response:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error saving report. Please try again.');
    }
  };

  return (
    <div className="px-10">
      <h1 className="text-4xl font-bold py-3 flex items-center">
        Report Details
        <span className="ml-4">
          <img width={40} src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716300380/patient_u29wkb.png" alt="patient icon" />
        </span>
      </h1>

      {renderFields(formData)}

      <div className="flex justify-between mt-3">
        {isEditing ? (
          <>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center me-2 mb-2"
              onClick={() => setIsEditing(false)}
            >
              <img src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716276383/icons8-edit-24_fpgba3.png" className="h-6 w-5 pb-1 mr-2" />
              Cancel
            </button>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center me-2 mb-2"
              onClick={handleSave}
            >
              Save
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center me-2 mb-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center me-2 mb-2"
              onClick={() => setIsEditing(true)}
            >
              <img src="https://res.cloudinary.com/duwadnxwf/image/upload/v1716276383/icons8-edit-24_fpgba3.png" className="h-6 w-5 pb-1 mr-2" />
              Edit
            </button>
          </form>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditableForm;
