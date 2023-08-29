export default {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'no-unused-expressions': 'erroe',
    'no-use-before-define': 'error',
    'no-shadow': 'error',
  },
};
