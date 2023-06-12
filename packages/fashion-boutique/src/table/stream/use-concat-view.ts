import { IZDataRequest, IZDataSource } from '@zthun/helpful-query';
import { useEffect, useMemo, useState } from 'react';
import { ZDataViewConcat } from './data-view-concat';

export function useConcatView<T>(source: IZDataSource<T>, template: IZDataRequest) {
  const [view, setView] = useState<T[]>();
  const loader = useMemo(() => new ZDataViewConcat<T>(source, template), [source, template]);

  const refresh = async () => {
    const view = await loader.next();
    setView(view);
  };

  const next = async () => {
    setView(await loader.next());
  };

  useEffect(() => {
    refresh();
  }, [loader]);

  return {
    view,
    loading: loader.loading,
    error: loader.error,
    next
  };
}
