module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
                "allowExpressions": true,
                "allowTypedFunctionExpressions": true
            }
        ]
    },
};