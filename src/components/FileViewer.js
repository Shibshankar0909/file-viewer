import React from 'react';
import PDFViewer from './PDFViewer';

const FileViewer = ({ file, onSave }) => {
  if (!file) return <div>Select a file to view</div>;

  const isPDF = file.name.endsWith('.pdf');

  const getContent = () => {
    if (isPDF) {
      // For PDF files, return the PDFViewer component
      return <PDFViewer file={file} />;
    } else {
      // For other file types, read content from Object URL and display it
      return (
        <iframe
          title="File content"
          src={file.url}
          width="100%"
          height="500px"
          frameBorder="0"
        />
      );
    }
  };

  return (
    <div className="file-viewer">
      <h2 style={{textAlign: "center"}}>{file.name}</h2>
      {getContent()}
    </div>
  );
};

export default FileViewer;
