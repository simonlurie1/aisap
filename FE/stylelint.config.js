module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-prettier', // Add the prettier plugin
  ],
  rules: {
    'prettier/prettier': [
      true,
      {
        endOfLine: 'auto',
      },
    ],
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'keyframes-name-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'value-no-vendor-prefix': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
  fix: true,
};
