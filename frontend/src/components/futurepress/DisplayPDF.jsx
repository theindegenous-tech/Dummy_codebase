import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import './index2.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import _ from 'lodash';
// import Sample from '../LoginPage/Sample'
import Cover_pdf from '../LoginPage/Cover_pdf'





function DisplayPDF() {
    


    return (
        <div id="full-screen">
         <h1>hi</h1>
         <Cover_pdf/>

        </div>
    );
}

export { DisplayPDF };