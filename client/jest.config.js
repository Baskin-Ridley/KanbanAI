export default {
  // ...
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  maxWorkers: 4,
  watchPlugins: [
    [
      "jest-watch-typeahead/filename",
      {
        maxWorkers: 4,
        maxRetries: 5 // <-- set max retries here
      }
    ],
    // ...
  ],
  // ...
};
