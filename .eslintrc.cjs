module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      // jsx: true,
    },
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        selfClosingTag: 'never',
      },
    ],
    'vue/valid-template-root': 'off',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
        },
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'keyword-spacing': ['error'],
    'space-before-blocks': ['error', 'always'],
    'space-infix-ops': ['error', { int32Hint: true }],
    'arrow-spacing': ['error'],
    indent: ['error', 2],
  },
}
