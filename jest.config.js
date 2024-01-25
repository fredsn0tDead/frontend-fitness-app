export default {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  transformIgnorePatterns: [],
  // Add any other Jest configuration options here
  babelConfig: './.babelrc',
};