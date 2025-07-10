import type { OpenCascadeInstance } from 'opencascade.js';
import * as React from 'react';

import { initOCC } from '../helpers/init-occ';

// Global singleton instance
let occInstance: OpenCascadeInstance | null = null;
let isInitializing = false;

export function useOpenCascade() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const initializationPromise =
    React.useRef<Promise<OpenCascadeInstance> | null>(null);

  React.useEffect(() => {
    // If instance already exists, mark as initialized
    if (occInstance) {
      setIsInitialized(true);
      return;
    }

    // If already initializing, wait for that process
    if (isInitializing && initializationPromise.current) {
      setIsLoading(true);
      initializationPromise.current.then(() => {
        setIsInitialized(true);
        setIsLoading(false);
      });
      return;
    }

    // Start initialization
    if (!occInstance && !isInitializing) {
      isInitializing = true;
      setIsLoading(true);

      initializationPromise.current = initOCC()
        .then((occ) => {
          occInstance = occ;
          isInitializing = false;
          setIsInitialized(true);
          setIsLoading(false);
          return occ;
        })
        .catch((error) => {
          console.error('Failed to initialize OpenCascade:', error);
          isInitializing = false;
          setIsLoading(false);
          throw error;
        });
    }
  }, []);

  return {
    occ: occInstance,
    isInitialized,
    isLoading,
  };
}
