import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerateText = async () => {
    const modelName = 'BioMistral/BioMistral-7B'; // Specify your Hugging Face model name
    try {
      const response = await axios.post('/api/generate-text', { inputText, modelName });
      setGeneratedText(response.data.generatedText);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div>
      <h2>Text Generation</h2>
      <textarea
        rows={6}
        cols={50}
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your input text here..."
      />
      <br />
      <button onClick={handleGenerateText}>Generate Text</button>
      <h3>Generated Text:</h3>
      <div style={{ whiteSpace: 'pre-wrap', border: '1px solid #ccc', padding: '10px' }}>
        {generatedText}
      </div>
    </div>
  );
};

export default ChatBot;
