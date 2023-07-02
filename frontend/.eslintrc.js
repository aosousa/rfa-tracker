module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: 'plugin:react/recommended',
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    plugins: [
        '@typescript-eslint',
        'react'
    ],
    'rules': {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-console': 'off',
        'no-debugger': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'object-shorthand': 'warn',
        'prefer-destructuring': 'off',
        'quotes': ['warn', 'single', { 'avoidEscape': true }],
        'default-param-last': 'warn',
        'space-before-blocks': 'warn',
        'no-param-reassign': 'warn',
        'prefer-spread': 'warn',
        'prefer-arrow-callback': 'warn',
        'arrow-spacing': 'warn',
        'arrow-parens': 'warn',
        'arrow-body-style': 'warn',
        'no-confusing-arrow': 'warn',
        'no-duplicate-imports': 'warn',
        'dot-notation': 'off',
        'no-restricted-properties': 'warn',
        'no-undef': 'warn',
        'prefer-const': 'warn',
        'eqeqeq': 'warn',
        'no-case-declarations': 'warn',
        'no-unneeded-ternary': 'warn',
        'spaced-comment': 'warn',
        'space-infix-ops': 'warn',
        'no-multiple-empty-lines': 'warn',
        'array-bracket-spacing': 'warn',
        'block-spacing': 'warn',
        'comma-spacing': ['warn', { 'before': false, 'after': true }],
        'key-spacing': 'warn',
        'no-unused-vars': 'warn'
    }
}
