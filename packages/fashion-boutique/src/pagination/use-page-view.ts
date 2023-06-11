import { countBuckets } from '@zthun/helpful-fn';
import { IZDataRequest, IZDataSource } from '@zthun/helpful-query';
import { asStateData, useAsyncState } from '@zthun/helpful-react';
import { useMemo } from 'react';

/**
 * Returns a page view that calculates the necessary information for doing pagination.
 *
 * @param dataSource -
 *        The data source to retrieve the page information.
 * @param request -
 *        The current request that represents the page of data.
 *
 * @returns
 *        The view, count, size, and page number.
 */
export function usePageView<T = any>(dataSource: IZDataSource<T>, request: IZDataRequest) {
  const [view] = useAsyncState(() => dataSource.retrieve(request), [request, dataSource]);
  const [_count] = useAsyncState(() => dataSource.count(request), [request.filter, request.search, dataSource]);

  const size = request.size || Infinity;
  const count = asStateData(_count) || 0;
  const page = request.page || 1;
  const pages = useMemo(() => countBuckets(size, count, 1), [request.size, count]);

  return { view, count, pages, size, page };
}
