import { useThree } from '@react-three/fiber';
import * as React from 'react';
import type { ReplicadMeshedFaces } from 'replicad-threejs-helper';
import { syncFaces } from 'replicad-threejs-helper';
import * as THREE from 'three';

export const useReplicadFaceGeometry = (
  faces: ReplicadMeshedFaces,
  highlight: number[],
) => {
  const { invalidate } = useThree();
  const faceGeometry = React.useRef(new THREE.BufferGeometry());

  React.useLayoutEffect(() => {
    syncFaces(faceGeometry.current, faces, highlight);
    invalidate();
  }, [faces, highlight, invalidate]);

  React.useEffect(() => {
    const currentGeometry = faceGeometry.current;
    return () => {
      currentGeometry.dispose();
      invalidate();
    };
  }, [invalidate]);

  return faceGeometry.current;
};
