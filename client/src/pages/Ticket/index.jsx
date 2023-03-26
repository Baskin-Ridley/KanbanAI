<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
=======
import React, { useState } from 'react';
import Form_Button from "../../components/Form_Button";
import Form_Input from "../../components/Form_Input";
import Form_Textarea from "../../components/Form_Textarea";
>>>>>>> f4b8f1bf3434733c1dbb630f8301236833e076ef

const Ticket = () => {
  const [technologies, setTechnologies] = useState("Python");
  const [testFramework, setTestFramework] = useState("pytest");
  const [functionToTest, setFunctionToTest] = useState(
    "function add(a, b) {\n  return a + b;\n}"
  );
  const [testsForFunction, setTestsForFunction] = useState(
    "Your tests will appear here"
  );

  const sanitizeInput = (input) => {
    // Remove any leading/trailing white space
    let sanitizedInput = input.trim();
    // Replace any tabs with two spaces
    sanitizedInput = sanitizedInput.replace(/\t/g, "  ");
    // Replace any consecutive spaces with two spaces
    sanitizedInput = sanitizedInput.replace(/ +/g, " ");
    // Replace any line breaks with a '\n' character
    sanitizedInput = sanitizedInput.replace(/(\r\n|\n|\r)/gm, "\n");
    return sanitizedInput;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const sanitizedTechnologies = sanitizeInput(technologies);
    const sanitizedTestFramework = sanitizeInput(testFramework);
    const sanitizedFunctionToTest = sanitizeInput(functionToTest);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        technologies: sanitizedTechnologies,
        test_framework: sanitizedTestFramework,
        function_to_test: sanitizedFunctionToTest,
      }),
    };
<<<<<<< HEAD
    const response = await fetch(
      "https://built-differently-backend.onrender.com/ai-test",
      requestOptions
=======

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
        const response = await fetch('https://built-differently-backend.onrender.com//ai-test', requestOptions);
        const data = await response.json();
        setTestsForFunction(data.tests_for_function);
    };

    return (
        <main className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-8 m-12 text-center m-12 text-center">Create New Ticket</h2>
            <form onSubmit={handleFormSubmit}>
                <Form_Input
                    label="Title:"
                    type="text"
                    value="Sample Title"
                    formElementId="title"
                    ariaLabel="Field in which the ticket title is displayed"
                />
                <Form_Input
                    label="Content:"
                    type="text"
                    value="Sample Content"
                    formElementId="content"
                    ariaLabel="Field in which the ticket content is displayed"
                />
                <Form_Input
                    label="User:"
                    type="text"
                    value="User 1"
                    formElementId="user"
                    ariaLabel="Field in which the user is displayed"
                />
                <Form_Input
                    label="Technologies:"
                    type="text"
                    value="python"
                    formElementId="technologies"
                    ariaLabel="Field for input of technologies"
                />
                <Form_Input
                    label="Test Framework:"
                    type="text"
                    value="pytest"
                    formElementId="test-framework"
                    ariaLabel="Field for input of test framework"
                />
                <Form_Textarea
                    label="Function to Test:"
                    value={functionToTest}
                    onChange={(e) => setFunctionToTest(e.target.value)}
                    formElementId="function-to-test"
                    ariaLabel="Textarea in which to write the function to test"
                />
                <Form_Textarea
                    label="Tests for Function:"
                    value={testsForFunction}
                    onChange={(e) => setTestsForFunction(e.target.value)}
                    formElementId="tests-for-function"
                    ariaLabel="Textarea in which generated tests are displayed"
                />
                <Form_Button buttonText="Generate tests" formElementId="button-generate-test" ariaLabel="Button for generating tests" />
            </form>
        </main>
>>>>>>> f4b8f1bf3434733c1dbb630f8301236833e076ef
    );
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
          <input
            type="text"
            id="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="test-framework">Test Framework</label>
          <input
            type="text"
            id="test-framework"
            value={testFramework}
            onChange={(e) => setTestFramework(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="function-to-test">Function to Test</label>
          <textarea
            id="function-to-test"
            value={functionToTest}
            onChange={(e) => setFunctionToTest(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tests-for-function">Tests for Function</label>
          <textarea
            id="tests-for-function"
            value={testsForFunction}
            onChange={(e) => setTestsForFunction(e.target.value)}
          />
        </div>
        <button type="submit">Generate Tests</button>
      </form>
    </div>
  );
};

export default Ticket;
