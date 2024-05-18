import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const FileUpload = ({ onFileUpload }) => {
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    const allowedTypes = ['text/plain', 'application/json', 'application/pdf', 'text/html'];

    for (let file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.type}. Please upload a text, JSON, HTML, or PDF file.`);
        return;
      }

      setError('');
      const fileUrl = URL.createObjectURL(file);
      onFileUpload({
        name: file.name,
        url: fileUrl,
      });
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        id="fileInput"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={handleButtonClick} className="upload-button">
        <FaUpload /> Upload Files
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUpload;
