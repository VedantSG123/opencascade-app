/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { OpenCascadeInstance } from 'opencascade.js';
import * as replicad from 'replicad';

import { initOCC } from '@/helpers/init-occ';

import { runFunctionWithContext } from './vm';

let loaded = false;
let OC: OpenCascadeInstance | null = null;

function getEditedCode(code: string) {
  return `
${code}
return main(replicad);
`;
}

function runFunctionCode(code: string) {
  if (!loaded) {
    throw new Error('CAD worker not initialized');
  }

  const editedCode = getEditedCode(code);
  return runFunctionWithContext(editedCode, {
    replicad,
    OC,
  });
}

function formatException(oc: OpenCascadeInstance | null, e: unknown) {
  let message = 'Unknown Error';

  // refer: https://ocjs.org/docs/advanced/exceptions/catch-exceptions#extracting-exception-data
  if (typeof e === 'number') {
    if (oc) {
      message = oc.OCJS.getStandard_FailureData(e).GetMessageString();
    } else {
      message = 'OpenCascade.js not initialized';
    }
  } else if (e instanceof Error) {
    message = e.message;
  }

  return {
    error: true,
    message,
    stack: e instanceof Error ? e.stack : undefined,
  };
}

async function init() {
  if (loaded) {
    return Promise.resolve(true);
  }

  OC = await initOCC();

  loaded = true;
  replicad.setOC(OC);

  return true;
}

async function buildFromCode(code: string) {
  await init();

  let shapes;

  try {
    shapes = runFunctionCode(code) as unknown;
  } catch (e) {
    return formatException(OC, e);
  }
}
