module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential', // Essential Vue 3 rules
    '@vue/standard', // Vue.js standard style guide
    'prettier',
    'plugin:prettier/recommended', // Use Prettier with ESLint
  ],
  rules: {
    // Add project-specific ESLint rules here
  },
};
