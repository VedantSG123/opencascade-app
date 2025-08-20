import { useThree } from '@react-three/fiber';
import * as React from 'react';
import type { ThreeGeometry } from 'replicad-threejs-helper';
import { highlightInGeometry } from 'replicad-threejs-helper';

export const useApplyHighlights = (
  geometry: ThreeGeometry,
  highlights: number[],
) => {
  const { invalidate } = useThree();

  React.useLayoutEffect(() => {
    highlightInGeometry(highlights, geometry);
    invalidate();
  }, [geometry, highlights, invalidate]);
};
