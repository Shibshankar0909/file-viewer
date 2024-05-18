import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page, Thumbnail } from 'react-pdf';
import { FaArrowLeft, FaArrowRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import PDFOutline from './PDFOutline';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [jumpToPage, setJumpToPage] = useState('');

  const viewerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (viewerRef.current) {
        const hasOverflowed = viewerRef.current.scrollWidth > viewerRef.current.clientWidth;
        setIsOverflowed(hasOverflowed);
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [scale, pageNumber]);

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };
  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }
  const changePageBack = () => {
    changePage(-1);
  };

  const changePageNext = () => {
    changePage(1);
  };

  const jumpToPageNumber = () => {
    const page = parseInt(jumpToPage, 10);
    if (page > 0 && page <= numPages) {
      setPageNumber(page);
    } else {
      alert(`Please enter a page number between 1 and ${numPages}`);
    }
    setJumpToPage('');
  };

  const zoomIn = () => {
    setScale(prevScale => prevScale + 0.5);
  };

  const zoomOut = () => {
    setScale(prevScale => prevScale - 0.5);
  };

  return (
    <div>
      <div className="pdf-buttons">
        <button onClick={changePageBack} disabled={pageNumber <= 1}>
          <FaArrowLeft />
        </button>
        <button onClick={changePageNext} disabled={pageNumber >= numPages}>
          <FaArrowRight />
        </button>
        <button onClick={zoomIn} disabled={scale >= 10}>
          <FaSearchPlus />
        </button>
        <button onClick={zoomOut} disabled={scale <= 0.5}>
          <FaSearchMinus />
        </button>
        <div style={{ color: "white" }} className="jump-to-page">
          <span style={{ marginRight: '2px' }}>Go To</span>
          <input
            type="number"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            placeholder={pageNumber}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                jumpToPageNumber();
              }
            }}
            style={{ width: '50px', marginRight: '5px' }}
          />
          / {numPages}
          <button onClick={jumpToPageNumber}>Go</button>
        </div>
      </div>

      <div className="view">
        <PDFOutline file={file} onItemClick={onItemClick} currPage={pageNumber} />
        <div className="pdf-viewer">
          <Document className="pdf-area" file={file.url} onLoadSuccess={onDocumentLoadSuccess}>
            <div ref={viewerRef} className={isOverflowed ? '' : 'page-view'}>
              <Page className="pdf-page" scale={scale} pageNumber={pageNumber} />
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
