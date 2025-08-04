import type * as React from 'react';
import type { ReplicadMeshedEdges } from 'replicad-threejs-helper';
import * as THREE from 'three';

import { useApplyHighlights } from './hooks/useApplyHighlights';
import { useReplicadEdgeGeometry } from './hooks/useReplicadEdgeGeometry';
import meshColors from './meshColors';

const placeholderFaces = new THREE.BufferGeometry();

export const ReplicadFacesMesh: React.FC<ReplicadEdgesMeshProps> = ({
  edges,
  defaultHighlights,
  highlights = [],
  opacity,
}) => {
  const geometry = useReplicadEdgeGeometry(edges, defaultHighlights || []);
  useApplyHighlights(
    {
      faces: placeholderFaces,
      lines: geometry,
    },
    highlights,
  );

  const transparent = opacity !== undefined && opacity < 1;

  return (
    <lineSegments>
      <primitive attach='geometry' object={geometry} />
      <lineBasicMaterial
        attach={'material-0'}
        transparent={transparent}
        opacity={opacity}
        color={meshColors.line}
        polygonOffset
        polygonOffsetFactor={2.0}
        polygonOffsetUnits={1.0}
      />
      <lineBasicMaterial
        attach={'material-1'}
        transparent={transparent}
        opacity={opacity}
        color={meshColors.lineSelected}
        polygonOffset
        polygonOffsetFactor={2.0}
        polygonOffsetUnits={1.0}
      />
    </lineSegments>
  );
};

type ReplicadEdgesMeshProps = {
  edges: ReplicadMeshedEdges;
  defaultHighlights?: number[];
  highlights?: number[] | number;
  opacity?: number;
};
