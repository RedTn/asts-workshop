// eslint exercise 1 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.2"
//   to move on to the next exercise

const disallowedMethods = ['log', 'warn', 'error', 'info']

module.exports = {
  create(context) {
    return {
      Identifier(node) {
        if (
          node.name === 'console' &&
          node.parent.type === 'MemberExpression' &&
          node.parent.parent.type === 'CallExpression' &&
          disallowedMethods.includes(node.parent.property.name)
        ) {
          context.report({
            node,
            message: 'Using console is not allowed',
          })
        }
      },
    }
  },
}
