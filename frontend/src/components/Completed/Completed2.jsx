import React from 'react'
import { useNavigate } from 'react-router-dom'

function Completed2() {
    let navigate= useNavigate();
    let path="/login";
    navigate(path);
  return (
    <div>Completed2</div>
  )
}

export default Completed2