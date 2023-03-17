import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    const { user } = useContext(UserContext);
    return (
        <main className="w3-container w3-center">
            <h2>Page not found</h2>
            <p>
                <Link to="/">
                    Click here to see the home page.
                </Link>
            </p>
        </main>
    );
};

export default NotFoundPage;

