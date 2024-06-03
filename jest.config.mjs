// jest.config.mjs
export default {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": ["babel-jest", {
      presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-modules"], 
      plugins: ["@babel/plugin-transform-runtime"]
    }]
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/styleMock.mjs" // Correct path to fileMock.mjs
  },
  extensionsToTreatAsEsm: ['.jsx'],  // Correct file extension

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
