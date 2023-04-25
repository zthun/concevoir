import { useFashion } from '@zthun/fashion-boutique';
import { IZFashion, ZFashionName } from '@zthun/fashion-theme';
import { Dispatch, SetStateAction, useState } from 'react';

export type FashionState = [IZFashion | undefined, ZFashionName | undefined, Dispatch<SetStateAction<ZFashionName>>];

export function useFashionState(): FashionState {
  const [name, setName] = useState<ZFashionName | undefined>();
  const fashion = useFashion(name);
  return [fashion, name, setName];
}
