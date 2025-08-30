import type { MeshRenderOutput } from '@/types';

import { useEdgeEvent } from './hooks/useEdgeEvent';
import { useFaceEvent } from './hooks/useFaceEvent';
import { ReplicadEdgesMesh } from './ReplicadEdgesMesh';
import { ReplicadFacesMesh } from './ReplicadFacesMesh';

export function ReplicadCombinedMesh({
  shape,
  onEdgeClick,
  onFaceClick,
  edgesHighlight,
  facesHighlight,
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
        highlights={facesHighlight}
        defaultHighlights={shape.highlights}
        onClick={handleFaceClick}
      />
      <ReplicadEdgesMesh
        edges={shape.edges}
        highlights={edgesHighlight}
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
  edgesHighlight?: number[];
  facesHighlight?: number[];
};
