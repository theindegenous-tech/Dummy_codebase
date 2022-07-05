import { Link } from "react-router-dom";
import { Button } from '@mui/material'
import React from 'react'

function HomePage() {
  return (
    <div>
    <div>Landing Page before Login</div>
    <Link to="/login">
    <Button>Login</Button>
    </Link>
    </div>
  )
}

export default HomePage