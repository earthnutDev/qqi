export default function (babel: { types: any }) {
  const { types: t } = babel;

  return {
    name: 'remove-qqi-dog-calls',
    visitor: {
      CallExpression(path: { get: (arg0: string) => any; remove: () => void }) {
        const callee = path.get('callee');

        if (
          t.isMemberExpression(callee.node) &&
          t.idIdentifier(callee.node.object, { name: 'dog' }) &&
          (t.isIdentifier(callee.node.property, { name: 'info' }) ||
            t.isIdentifier(callee.node.property, { name: 'warn' }) ||
            t.isIdentifier(callee.node.property, { name: 'error' }))
        ) {
          path.remove();
        }
      },
    },
  };
}
