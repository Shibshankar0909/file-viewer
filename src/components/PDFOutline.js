import React, { useState, useEffect, useRef } from 'react';
import { Document, Thumbnail } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function PDFOutline({ file, onItemClick, currPage }) {
    const [numPages, setNumPages] = useState(null);
    const outlineRef = useRef(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        if (outlineRef.current) {
            const currentThumbnail = outlineRef.current.querySelector(`.thumbnail:nth-child(${(currPage-1) * 2 - 1})`);
            if (currentThumbnail) {
                outlineRef.current.scrollTo({
                    top: currentThumbnail.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    }, [currPage]);

    return (
        <div className="outline" ref={outlineRef} >
            <Document file={file.url} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <React.Fragment key={`page_${index + 1}`}>
                            <div
                                className={`thumbnail ${index === currPage - 1 ? 'focus' : ''}`}
                                onClick={() => onItemClick({ pageNumber: index + 1 })}
                                
                            >
                                <Thumbnail width={150} pageNumber={index + 1} />
                            </div>
                            <p style={{ color: "white", textAlign: "center", margin: 0, padding: 0 }}>{index + 1}</p>
                        </React.Fragment>
                    )
                )}
            </Document>
        </div>
    );
}

export default PDFOutline;
