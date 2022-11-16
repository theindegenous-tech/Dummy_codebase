import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import HomePage from './components/pg_before_landing/HomePage';
import Signup from './components/LoginPage/Signup';
import UserProvider from './components/context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import Login1 from './components/LoginPage/Login1';
import Login2 from './components/LoginPage/Login2'
import Login3 from './components/LoginPage/Login3'
import { FullScreenbook } from './components/futurepress/FullScreenbook';
import { DisplayPDF } from './components/futurepress/DisplayPDF';
import Login4 from './components/LoginPage/Login4'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    {/* <React.StrictMode> */}
      <BrowserRouter >
        <Routes>
          <Route exact path="/*" element={<HomePage />} >
            
          </Route>
          <Route exact path="/login" element={<Login1 />} />
          <Route exact path="/login/password" element={<Login2 />} />
          <Route exact path="/signin" element={<Login3 />} />
          <Route exact path="/login/email" element={<Login4/>} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/readbook" element={<FullScreenbook />} />
          <Route exact path="/displaypdf" element={<DisplayPDF />} />
          <Route exact path="/dashboard/*" element={
            <PrivateRoute><App /></PrivateRoute>} >
          </Route>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>  
      </BrowserRouter>
    {/* </React.StrictMode> */} 
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();