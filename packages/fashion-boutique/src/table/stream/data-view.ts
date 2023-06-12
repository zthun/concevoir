export interface IZDataView<T> {
  readonly current: T[];
  readonly loading: boolean;
  readonly error: Error | null;

  next(): Promise<T[]>;
}
