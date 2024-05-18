import React from 'react';

const FileTabs = ({ files, activeFile, setActiveFile, closeFile }) => {
  const handleCloseFile = (file) => {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(file.url);
    // Call the closeFile function passed as a prop
    closeFile(file);
  };
  const truncateFileName = (name) => {
    return name.length > 15 ? `${name.substring(0, 15)}...` : name;
  };
  return (
    <div className="file-tabs">
      {files.map((file, index) => (
        <div
          key={index}
          className={`file-tab ${activeFile === file ? 'active' : ''}`}
          onClick={() => setActiveFile(file)}
        >
          <div className="file-name">
            {truncateFileName(file.name)}
          </div>
          <div className="file-btn">
            <button className='btn' onClick={(e) => {
              e.stopPropagation();
              handleCloseFile(file);
            }}>x</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileTabs;
