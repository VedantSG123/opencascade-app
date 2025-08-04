import { useTexture } from '@react-three/drei';
import type * as React from 'react';
import type { ReplicadMeshedFaces } from 'replicad-threejs-helper';
import * as THREE from 'three';

import { useApplyHighlights } from './hooks/useApplyHighlights';
import { useReplicadFaceGeometry } from './hooks/useReplicadFaceGeometry';
import meshColors from './meshColors';

const placeholderLines = new THREE.BufferGeometry();

export const ReplicadFacesMesh: React.FC<ReplicadFacesMeshProps> = ({
  faces,
  defaultHighlights,
  highlights = [],
  opacity,
}) => {
  const geometry = useReplicadFaceGeometry(faces, defaultHighlights || []);
  useApplyHighlights(
    {
      faces: geometry,
      lines: placeholderLines,
    },
    highlights,
  );

  const matcapTexture = useTexture('matcap-main.jpg');

  const transparent = opacity !== undefined && opacity < 1;

  return (
    <mesh>
      <primitive attach='geometry' object={geometry} />
      <meshMatcapMaterial
        attach={'material-0'}
        transparent={transparent}
        matcap={matcapTexture}
        opacity={opacity}
        color={meshColors.base}
        polygonOffset
        polygonOffsetFactor={2.0}
        polygonOffsetUnits={1.0}
      />
      <meshMatcapMaterial
        attach={'material-1'}
        transparent={transparent}
        matcap={matcapTexture}
        opacity={opacity}
        color={meshColors.selected}
        polygonOffset
        polygonOffsetFactor={2.0}
        polygonOffsetUnits={1.0}
      />
    </mesh>
  );
};

type ReplicadFacesMeshProps = {
  faces: ReplicadMeshedFaces;
  defaultHighlights?: number[];
  highlights?: number[] | number;
  opacity?: number;
};
