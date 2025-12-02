module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  env: { browser: true, es2021: true, node: true },
  extends: ['next/core-web-vitals'],
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    indent: ['error', 2],
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    semi: ['error', 'never'],
    'no-inline-comments': 'error',
    'no-warning-comments': ['error', { terms: ['todo', 'fixme', 'hack'], location: 'anywhere' }],
    'spaced-comment': ['error', 'never'],
  }
}
