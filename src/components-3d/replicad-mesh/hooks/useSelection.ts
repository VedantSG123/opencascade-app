import * as React from 'react';

export function useSelection(selecedMode: string, validSelectedMode: string[]) {
  const [selection, setSelection] = React.useState<SelectionType | null>(null);

  if (!validSelectedMode.includes(selecedMode)) {
    return [selection, () => null];
  }

  const select = (shapeId: string) => {
    const handleSelect = (index: number) => {
      setSelection({ shapeId, index });
    };

    return handleSelect;
  };

  return [selection, select];
}
type SelectionType = {
  shapeId: string;
  index: number;
};
