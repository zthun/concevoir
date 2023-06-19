import { IZDataRequest, IZDataSource, ZDataRequestBuilder } from '@zthun/helpful-query';
import { useEffect, useRef, useState } from 'react';

/**
 * A type of view that loads the next set of data in batches.
 *
 * @param source -
 *        The data source to load from.
 * @param template -
 *        The template request.  The page size will be used as
 *        the batch size.  The page to load will be ignored and
 *        will instead be controlled by this hook.
 *
 * @returns
 *        The current view and whether or not the data is being loaded.
 *        Also returns the method to load the next batch.
 */
export function useConcatView<T>(source: IZDataSource<T>, template: IZDataRequest) {
  const [view, setView] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const nextRequest = useRef(new ZDataRequestBuilder().copy(template).page(1).build());
  const _count = useRef(Promise.resolve(0));

  const _loadMore = async (loaded: number) => {
    const __count = await _count.current;

    setCount(__count);

    if (__count === loaded) {
      // All done loading.
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request = nextRequest.current;
      const page = await source.retrieve(request);
      nextRequest.current = new ZDataRequestBuilder()
        .copy(request)
        .page(request.page! + 1)
        .build();

      setView((v) => v!.concat(page));
    } catch (e) {
      setError(new Error(e));
    } finally {
      setLoading(false);
    }
  };

  const more = async () => {
    return _loadMore(view.length);
  };

  const _reset = async () => {
    nextRequest.current = new ZDataRequestBuilder().copy(template).page(1).build();
    _count.current = source.count(nextRequest.current);
    setView([]);
    await _loadMore(0);
  };

  useEffect(() => {
    _reset();
  }, [source, template]);

  return {
    view,
    loading,
    error,
    count,
    more
  };
}
