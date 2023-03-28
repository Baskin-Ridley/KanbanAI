import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    const { user } = useContext(UserContext);
    return (
        <main className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-8 m-12 text-center">Page not found</h2>
            <p>
                <Link to="/">
                    Click here to see the home page.
                </Link>
            </p>
        </main>
    );
};

export default NotFoundPage;

