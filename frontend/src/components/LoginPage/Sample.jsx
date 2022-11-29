import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { pdfjs } from 'react-pdf';

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';


  // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  

 function  Sample (props){
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div className="page">
      <nav className="nav">
        <button id="button_change" onClick={goToPrevPage} className="previous">
          Prev
        </button>
        <button id="button_change" onClick={goToNextPage} className="next">
          Next
        </button>
        <p className="p">
          Page {pageNumber} & {pageNumber+1}  of {numPages}
        </p>
      </nav>

      <Document file={props.url}onLoadSuccess={onDocumentLoadSuccess}>
        <div className="container" id="block_container" >
        <div>

        <Page pageNumber={pageNumber} />
        </div>
        <div>

        <Page pageNumber={pageNumber+1} />
        </div>
        </div>
      </Document>
    </div>
  );
};

export default Sample;
