module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: false,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['*.d.ts', '*.js'],
  rules: {
    'no-constant-condition': ['off'],
    '@typescript-eslint/no-floating-promises': 'error',
  },
};
