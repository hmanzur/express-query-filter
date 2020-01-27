module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jquery: false
  },
  globals: {
    $: false
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single'],
    'semi-spacing': ['error', {'before': false, 'after': true}],
    'semi': ['error', 'never'],
    'switch-colon-spacing': ['error', {'after': true, 'before': false}],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true,
        'ArrowFunctionExpression': true,
        'FunctionExpression': true
      }
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
