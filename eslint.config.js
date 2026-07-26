const babelParser = require('@babel/eslint-parser')
const react = require('eslint-plugin-react')
const prettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = [
  {
    ignores: ['coverage/', 'node_modules/']
  },
  {
    files: ['**/*.js'],
    plugins: {
      react
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          rootMode: 'root'
        },
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        require: 'readonly',
        module: 'writable',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly'
      }
    }
  },
  prettierRecommended
]
