import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { pdfjs } from 'react-pdf';

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';


  // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  
 function Cover_pdf (){
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
      

      <Document   file="https://booksdatabaseepub.nyc3.digitaloceanspaces.com/prideprejudice00aust.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <div className="container" id="block_container" >
        <div >

        <Page pageNumber={pageNumber} />
        </div>
       
        </div>
      </Document>
    </div>
  );
};

export default Cover_pdf;
