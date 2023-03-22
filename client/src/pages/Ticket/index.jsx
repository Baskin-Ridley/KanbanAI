import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Ticket = () => {
  const { user } = useContext(UserContext);
  const [technologies, setTechnologies] = useState('');
  const [testFramework, setTestFramework] = useState('');
  const [functionToTest, setFunctionToTest] = useState('');
  const [testsForFunction, setTestsForFunction] = useState('Your tests will appear here');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:5000/ai-test', {
      technologies,
      test_framework: testFramework,
      function_to_test: functionToTest,
    });
    setTestsForFunction(response.data.tests_for_function);
  };

  if (!user) {
    return (
      <main>
        <p>Please login to access this page</p>
        <Link to="http://localhost:5000/login">Login Here</Link>
        <p>Don't have an account, <Link to="http://localhost:5000/register">register here</Link></p>
      </main>
    );
  }

  return (
    <main>
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
          <label htmlFor="user-status">User Status</label>
          <input type="text" id="user-status" value={user.status} readOnly />
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
    </main>
  );
};

export default Ticket;
