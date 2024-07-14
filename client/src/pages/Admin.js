import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/addpatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender }),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success('Patient added successfully!');
        setName('');
        setAge('');
        setGender('');
      } else {
        toast.error(`Failed to add patient: ${responseData.error}`);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      toast.error('Error adding patient. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen relative overflow-hidden">
      <div className="relative z-2">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-center">Admin Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium mb-1" htmlFor="formName">
                Name
              </label>
              <input
                type="text"
                id="formName"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1" htmlFor="formAge">
                Age
              </label>
              <input
                type="number"
                id="formAge"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1" htmlFor="formGender">
                Gender
              </label>
              <input
                type="text"
                id="formGender"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
            >
              Add Patient
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
