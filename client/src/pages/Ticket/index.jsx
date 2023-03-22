import React, { useState } from 'react';
import axios from 'axios';

const Ticket = () => {
    const [technologies, setTechnologies] = useState('Python');
    const [testFramework, setTestFramework] = useState('pytest');
    const [functionToTest, setFunctionToTest] = useState('function add(a, b) {\n  return a + b;\n}');
    const [testsForFunction, setTestsForFunction] = useState('Your tests will appear here');

    const sanitizeInput = (input) => {
        // Remove any leading/trailing white space
        let sanitizedInput = input.trim();
        // Replace any tabs with two spaces
        sanitizedInput = sanitizedInput.replace(/\t/g, '  ');
        // Replace any consecutive spaces with two spaces
        sanitizedInput = sanitizedInput.replace(/ +/g, ' ');
        // Replace any line breaks with a '\n' character
        sanitizedInput = sanitizedInput.replace(/(\r\n|\n|\r)/gm, '\n');
        return sanitizedInput;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const sanitizedTechnologies = sanitizeInput(technologies);
        const sanitizedTestFramework = sanitizeInput(testFramework);
        const sanitizedFunctionToTest = sanitizeInput(functionToTest);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                technologies: sanitizedTechnologies,
                test_framework: sanitizedTestFramework,
                function_to_test: sanitizedFunctionToTest,
            }),
        };
        const response = await fetch('http://localhost:5000/ai-test', requestOptions);
        const data = await response.json();
        setTestsForFunction(data.tests_for_function);
    };

    return (
        <div>
            <h2>Create New Ticket</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value="Sample Title" readOnly />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" value="Sample Content" readOnly />
                </div>
                <div>
                    <label htmlFor="user">User</label>
                    <input type="text" id="user" value="Anonymous" readOnly />
                </div>
                <div>
                    <label htmlFor="technologies">Technologies</label>
                    <input type="text" id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="test-framework">Test Framework</label>
                    <input type="text" id="test-framework" value={testFramework} onChange={(e) => setTestFramework(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="function-to-test">Function to Test</label>
                    <textarea id="function-to-test" value={functionToTest} onChange={(e) => setFunctionToTest(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="tests-for-function">Tests for Function</label>
                    <textarea id="tests-for-function" value={testsForFunction} onChange={(e) => setTestsForFunction(e.target.value)} />
                </div>
                <button type="submit">Generate Tests</button>
            </form>
        </div>
    );
};

export default Ticket;
