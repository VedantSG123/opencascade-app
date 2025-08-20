import type { MeshRenderOutput } from '@/types';

import { useEdgeEvent } from './hooks/useEdgeEvent';
import { useFaceEvent } from './hooks/useFaceEvent';
import { ReplicadEdgesMesh } from './ReplicadEdgesMesh';
import { ReplicadFacesMesh } from './ReplicadFacesMesh';

export function ReplicadCombinedMesh({
  shape,
  onEdgeClick,
  onFaceClick,
}: ReplicadCombinedMeshProps) {
  const { handleEdgeClick } = useEdgeEvent(onEdgeClick);
  const { handleFaceClick } = useFaceEvent(onFaceClick);

  if (!shape.mesh || !shape.edges) {
    return null;
  }
  return (
    <>
      <ReplicadFacesMesh
        faces={shape.mesh}
        defaultHighlights={shape.highlights}
        onClick={handleFaceClick}
      />
      <ReplicadEdgesMesh
        edges={shape.edges}
        defaultHighlights={shape.highlights}
        onClick={handleEdgeClick}
      />
    </>
  );
}

type ReplicadCombinedMeshProps = {
  shape: MeshRenderOutput;
  onEdgeClick: (index: number) => void;
  onFaceClick: (index: number) => void;
};
