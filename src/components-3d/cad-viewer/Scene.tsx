import { Grid } from '@react-three/drei';
import * as React from 'react';

import Controls from '../helpers/Controls';
import Stage from '../helpers/Stage';

export const Scene: React.FC<SceneProps> = ({
  children,
  hideGizmo = false,
  enableDamping = false,
  center,
}) => {
  return (
    <>
      <Controls hideGizmo={hideGizmo} enableDamping={enableDamping} />
      <Stage center={center}>{children}</Stage>
      <Grid />
    </>
  );
};

type SceneProps = {
  hideGizmo?: boolean;
  enableDamping?: boolean;
  center?: boolean;
  children: React.ReactNode;
};
