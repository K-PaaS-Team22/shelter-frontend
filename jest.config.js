module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "babel-jest"
  },
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  transformIgnorePatterns: [],
  roots: ["<rootDir>/src"]
};
