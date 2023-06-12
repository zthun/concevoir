import { IZDataRequest, IZDataSource, ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZDataView } from './data-view';

export class ZDataViewConcat<T> implements IZDataView<T> {
  private _count: Promise<number>;
  private _nextRequest: IZDataRequest;

  public current: T[] = [];
  public loading = false;
  public error: Error | null = null;

  public constructor(private _source: IZDataSource<T>, private _template: IZDataRequest) {
    this._nextRequest = new ZDataRequestBuilder().copy(this._template).page(1).build();
    this._count = this._source.count(this._template);
  }

  public async next(): Promise<T[]> {
    const count = await this._count;

    if (count === this.current.length) {
      return this.current;
    }

    try {
      this.loading = true;
      const page = await this._source.retrieve(this._nextRequest);
      this.current = this.current.slice().concat(page);
      this._nextRequest = new ZDataRequestBuilder()
        .copy(this._nextRequest)
        .page(this._nextRequest.page! + 1)
        .build();
    } catch (e) {
      this.error = new Error(e);
    } finally {
      this.loading = false;
    }

    return this.current;
  }
}
