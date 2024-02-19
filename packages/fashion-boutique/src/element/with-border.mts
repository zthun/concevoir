import { ZSizeVoid, ZThicknessSize } from '@zthun/fashion-tailor';
import { mutateAttribute } from '@zthun/helpful-dom';
import { IZQuadrilateral, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { ZElementConstructor } from './element-constructor.mjs';

export interface IZWithBorder {
  border?: Partial<IZQuadrilateral<ZThicknessSize>>;
  trim?: Partial<IZQuadrilateral<Property.BorderStyle>>;

  trimBottom(): Property.BorderStyle;
  trimLeft(): Property.BorderStyle;
  trimRight(): Property.BorderStyle;
  trimTop(): Property.BorderStyle;

  borderBottom(): ZThicknessSize;
  borderLeft(): ZThicknessSize;
  borderRight(): ZThicknessSize;
  borderTop(): ZThicknessSize;
}

export const WithBorderAttributes = ['data-border', 'data-trim'];

export function WithBorder<TBase extends ZElementConstructor = ZElementConstructor>(Base: TBase) {
  return class extends Base implements IZWithBorder {
    _trim?: Partial<IZQuadrilateral<Property.BorderStyle>>;
    _border?: Partial<IZQuadrilateral<ZThicknessSize>>;

    public get border() {
      return this._border;
    }

    public set border(val: Partial<IZQuadrilateral<ZThicknessSize>> | undefined) {
      this._border = val;
      mutateAttribute(this, 'data-border', JSON.stringify(val));
    }

    public get trim() {
      return this._trim;
    }

    public set trim(val: Partial<IZQuadrilateral<Property.BorderStyle>> | undefined) {
      this._trim = val;
      mutateAttribute(this, 'data-trim', JSON.stringify(val));
    }

    public borderBottom() {
      return firstDefined(ZSizeVoid.None, this.border?.bottom);
    }

    public borderLeft() {
      return firstDefined(ZSizeVoid.None, this.border?.left);
    }

    public borderRight() {
      return firstDefined(ZSizeVoid.None, this.border?.right);
    }

    public borderTop() {
      return firstDefined(ZSizeVoid.None, this.border?.top);
    }

    public trimBottom() {
      return firstDefined('none', this.trim?.bottom);
    }

    public trimLeft() {
      return firstDefined('none', this.trim?.left);
    }

    public trimRight() {
      return firstDefined('none', this.trim?.right);
    }

    public trimTop() {
      return firstDefined('none', this.trim?.top);
    }
  };
}
