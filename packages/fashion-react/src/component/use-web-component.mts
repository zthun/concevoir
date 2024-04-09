import { useMemo } from 'react';

export function useWebComponent(ctor: CustomElementConstructor) {
  return useMemo(() => ctor, []);
}
