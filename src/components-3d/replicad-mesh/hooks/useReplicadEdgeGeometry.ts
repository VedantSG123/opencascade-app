import { useThree } from '@react-three/fiber';
import * as React from 'react';
import type { ReplicadMeshedEdges } from 'replicad-threejs-helper';
import { syncLines } from 'replicad-threejs-helper';
import * as THREE from 'three';

export const useReplicadEdgeGeometry = (
  edges: ReplicadMeshedEdges,
  highlight: number[],
) => {
  const { invalidate } = useThree();
  const edgeGeometry = React.useRef(new THREE.BufferGeometry());

  React.useLayoutEffect(() => {
    syncLines(edgeGeometry.current, edges, highlight);
    invalidate();
  }, [edges, highlight, invalidate]);

  React.useEffect(() => {
    const currentGeometry = edgeGeometry.current;
    return () => {
      currentGeometry.dispose();
      invalidate();
    };
  }, [invalidate]);
};
