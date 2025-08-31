import openCascade from 'replicad-opencascadejs/src/replicad_single.js';
import openCascadeWasm from 'replicad-opencascadejs/src/replicad_single.wasm?url';

export async function initOCC() {
  // @ts-expect-error OpenCascade.js module lacks proper TypeScript definitions
  return await openCascade({
    locateFile: () => openCascadeWasm,
  });
}
