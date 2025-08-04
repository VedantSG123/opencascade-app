import { useThree } from '@react-three/fiber';
import * as React from 'react';
import type { ThreeGeometry } from 'replicad-threejs-helper';
import { highlightInGeometry } from 'replicad-threejs-helper';

export const useApplyHighlights = (
  geometry: ThreeGeometry,
  highlights: number[] | number,
) => {
  const { invalidate } = useThree();

  React.useLayoutEffect(() => {
    let highlightArray: number[];
    if (Array.isArray(highlights)) {
      highlightArray = highlights;
    } else {
      highlightArray = [highlights];
    }
    highlightInGeometry(highlightArray, geometry);
    invalidate();
  }, [geometry, highlights, invalidate]);
};
