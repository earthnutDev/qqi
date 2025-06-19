export default function (babel: { types: any }) {
  const { types: t } = babel;

  return {
    name: 'remove-qqi-dog-calls',
    visitor: {
      CallExpression(path: {
        get: (arg0: string) => any;
        remove: () => void;
        scope: { getBinding: (arg0: any) => any };
      }) {
        const callee = path.get('callee');

        if (
          t.isMemberExpression(callee.node) &&
          t.isIdentifier(callee.node.object, { name: 'dog' }) &&
          (t.isIdentifier(callee.node.property, { name: 'info' }) ||
            t.isIdentifier(callee.node.property, { name: 'warn' }) ||
            t.isIdentifier(callee.node.property, { name: 'error' }))
        ) {
          path.remove();
        }
        // 处理调用的 dog()
        else if (t.isIdentifier(callee.node)) {
          const binding = path.scope.getBinding(callee.node.name);
          if (
            binding &&
            ['import', 'module'].some(e => binding?.kind === e) &&
            binding?.path?.parent?.source?.value?.endsWith('/dog') &&
            binding?.identifier?.name === 'dog'
          ) {
            path.remove();
          }
        }
      },
    },
  };
}
