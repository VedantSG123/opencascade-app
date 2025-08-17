// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFunctionWithContext(code: string, content: Record<string, any>) {
  return `
  return function(context){
    "use strict"
    ${Object.keys(content)
      .map((key) => `let ${key} = context['${key}'];`)
      .join('')}
    ${code}
  }
  `;
}

export function runFunctionWithContext(
  code: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: Record<string, any>,
) {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = Function(buildFunctionWithContext(code, context));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return fn(context);
}
