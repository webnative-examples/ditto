module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs', 'node_modules'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      }
    }],
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/quotes': ['error', 'single', {
      allowTemplateLiterals: true
    }],
    // If you want to *intentionally* run a promise without awaiting, prepend it with "void " instead of "await "
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-unsafe-call': ['off'],
    '@typescript-eslint/no-unsafe-assignment': ['warn'],
    '@typescript-eslint/no-unsafe-member-access': ['warn'],
    '@typescript-eslint/no-unsafe-return': ['warn'],
  }
};
