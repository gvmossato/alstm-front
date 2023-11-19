module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
    '@vue/typescript/recommended',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'max-len': 'off',
    'import/prefer-default-export': 'off',

    'no-underscore-dangle': ['error', {
      allow: ['_id'],
    }],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],

    'vue/custom-event-name-casing': ['error', {
      ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'],
    }],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
};
