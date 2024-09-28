import React from 'react'
import { NavLink } from 'react-router-dom'; // assuming you use react-router
import '../Styles/ErrorPage.css'
const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <NavLink to="/" className="home-btn">Go Back Home</NavLink>
      </div>
    </div>
  )
}

export default ErrorPage
