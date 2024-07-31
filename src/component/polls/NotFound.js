import React from 'react';
import { Link } from 'react-router-dom';

const notFoundStyle = {
    textAlign: 'center',
    padding: '50px'
};

const headingStyle = {
    fontSize: '100px',
    margin: '0'
};

const paragraphStyle = {
    fontSize: '24px'
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'none'
};

const linkHoverStyle = {
    textDecoration: 'underline'
};

export const NotFound = () => {
    return (
        <div style={notFoundStyle}>
            <h1 style={headingStyle}>404</h1>
            <p style={paragraphStyle}>Page Not Found</p>
            <Link
                to="/"
                style={linkStyle}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = linkStyle.textDecoration}
            >
                Go Back to Home
            </Link>
        </div>
    );
};

