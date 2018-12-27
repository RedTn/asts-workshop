// eslint exercise 2 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.3"
//   to move on to the next exercise

const disallowedMethods = ['log', 'warn', 'error', 'info']

module.exports = {
  create(context) {
    return {
      'CallExpression > MemberExpression > Identifier[name="console"]'(node) {
        if (!disallowedMethods.includes(node.parent.property.name)) {
          return
        }
        context.report({
          node,
          message: 'Using console is not allowed',
        })
      },
    }
  },
}
