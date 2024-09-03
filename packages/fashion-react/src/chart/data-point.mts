import { IZFashion } from "@zthun/fashion-theme";

export interface IZDataPoint {
  x: number;
  y: number;
  name?: string;
  fashion?: IZFashion;
}

export class ZDataPointBuilder {
  private _point: IZDataPoint;

  public constructor(x: number, y: number) {
    this._point = { x, y };
  }

  public name(val: string): this {
    this._point.name = val;
    return this;
  }

  public fashion(val: IZFashion): this {
    this._point.fashion = val;
    return this;
  }

  public build(): IZDataPoint {
    return structuredClone(this._point);
  }
}
