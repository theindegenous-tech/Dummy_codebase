import React from 'react'
import { useNavigate } from 'react-router-dom';

function Bookmark2() {
    let navigate= useNavigate();
    let path="/login";
    navigate(path);
  return (
    <div>Bookmark2</div>
  )
}

export default Bookmark2