// eslint exercise 3 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.4"
//   to move on to the next exercise

const disallowedMethods = ['log', 'info', 'warn', 'error', 'dir']

module.exports = {
  create(context) {
    const config = context.options[0] || {}
    const allowedMethods = config.allowedMethods || []
    return {
      Identifier(node) {
        if (
          !looksLike(node, {
            name: 'console',
            parent: {
              type: 'MemberExpression',
              parent: {type: 'CallExpression'},
              property: {
                name: val =>
                  disallowedMethods.includes(val) &&
                  !allowedMethods.includes(val),
              },
            },
          })
        ) {
          return
        }
        context.report({
          node: node.parent.property,
          message: 'Using console is not allowed',
        })
      },
    }
  },
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
