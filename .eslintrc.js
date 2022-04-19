module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['import'],
  globals: {
    window: true,
    document: true,
    XMLHttpRequest: true,
    Blob: true,
    Document: true,
    FormData: true,
  },
  rules: {
    'prefer-destructuring': ['off'],
  },
};
