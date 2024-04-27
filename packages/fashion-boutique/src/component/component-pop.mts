export interface IZComponentPop {
  open(): Promise<void>;
  close(val?: string): Promise<void>;
}
