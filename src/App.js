import React, { useState, useEffect } from 'react';
import FileTabs from './components/FileTabs';
import FileViewer from './components/FileViewer';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    // Load files from localStorage when component mounts
    const storedFiles = JSON.parse(localStorage.getItem('files'));
    if (storedFiles) {
      setFiles(storedFiles);
      setActiveFile(storedFiles[0]); // Set the first file as active
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever files change
    localStorage.setItem('files', JSON.stringify(files));
  }, [files]);

  const handleFileUpload = (file) => {
    setFiles([...files, file]);
    setActiveFile(file);
  };

  const closeFile = (fileToClose) => {
    setFiles(files.filter(file => file !== fileToClose));
    if (activeFile === fileToClose) {
      setActiveFile(files.length > 1 ? files[0] : null);
    }
  };

  return (
    <div className="app">
      <FileUpload onFileUpload={handleFileUpload} />
      <FileTabs
        files={files}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        closeFile={closeFile}
      />
      <FileViewer file={activeFile}/>
    </div>
  );
};

export default App;
