import openCascade from 'opencascade.js/dist/opencascade.full.js';
import openCascadeWasm from 'opencascade.js/dist/opencascade.full.wasm?url';

export async function initOCC() {
  // @ts-expect-error OpenCascade.js module lacks proper TypeScript definitions
  return await openCascade({
    locateFile: () => openCascadeWasm,
  });
}
