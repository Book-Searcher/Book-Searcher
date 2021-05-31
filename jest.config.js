module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['src/node_modules/(?!@sapper)'],
  moduleFileExtensions: ['js', 'svelte', 'mjs'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@static(.*)$': '<rootDir>/static$1',
    '^@db(.*)$': '<rootDir>/src/db$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@store(.*)$': '<rootDir>/src/store/store.js',
  },
  moduleDirectories: ['node_modules', 'src/node_modules'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
