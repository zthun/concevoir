import { ZBoxBorderElement, ZBoxElement, ZBoxMarginElement, ZBoxPaddingElement } from '@zthun/fashion-boutique';
import { ZSize, ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZHorizontalAnchor, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { get } from 'lodash-es';
import React, { MouseEventHandler, useEffect, useMemo, useRef } from 'react';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { IZComponentWidth } from '../component/component-width.mjs';
import { useFashionWebComponent, useWidthWebComponent } from '../web-components/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-box']: ZBoxElement & any;
      ['z-box-border']: ZBoxBorderElement & any;
      ['z-box-padding']: ZBoxPaddingElement & any;
      ['z-box-margin']: ZBoxMarginElement & any;
    }
  }
}

type ZDimensionProps<TSizes> =
  | TSizes
  | { x?: TSizes; y?: TSizes }
  | { left?: TSizes; right?: TSizes; top?: TSizes; bottom?: TSizes };

interface IZBorderProps extends Pick<IZComponentWidth<ZDimensionProps<ZSizeFixed | ZSizeVoid>>, 'width'> {
  style?: Property.BorderStyle;
}

export interface IZBox extends IZComponentHierarchy, IZComponentStyle, IZComponentWidth, IZComponentFashion {
  border?: IZBorderProps;

  padding?: ZDimensionProps<ZSizeFixed | ZSizeVoid>;
  margin?: ZDimensionProps<ZSizeFixed | ZSizeVaried.Fit | ZSizeVoid>;

  justification?: ZHorizontalAnchor;

  onClick?: MouseEventHandler;
}

/**
 * Just a box.
 *
 * @param props -
 *        The properties for the box
 *
 * @returns
 *        The JSX to render the box.
 */
export function ZBox(props: IZBox) {
  const { className, fashion, justification, onClick } = props;
  const { width, widthLg, widthMd, widthSm, widthXs } = props;
  const { margin } = props;
  const { border } = props;
  const { padding } = props;
  const { children } = props;
  const tabIndex = onClick ? 0 : undefined;
  const $width = useMemo(
    () => ({ xl: width, lg: widthLg, md: widthMd, sm: widthSm, xs: widthXs }),
    [width, widthLg, widthMd, widthSm, widthXs]
  );

  const asDimension = (d: ZSize | object) => (typeof d === 'object' ? ZSizeVoid.None : d);

  const pl = asDimension(firstDefined(ZSizeVoid.None, get(padding, 'left'), get(padding, 'x'), padding));
  const pr = asDimension(firstDefined(ZSizeVoid.None, get(padding, 'right'), get(padding, 'x'), padding));
  const pt = asDimension(firstDefined(ZSizeVoid.None, get(padding, 'top'), get(padding, 'y'), padding));
  const pb = asDimension(firstDefined(ZSizeVoid.None, get(padding, 'bottom'), get(padding, 'y'), padding));

  const ml = asDimension(firstDefined(ZSizeVoid.None, get(margin, 'left'), get(margin, 'x'), margin));
  const mr = asDimension(firstDefined(ZSizeVoid.None, get(margin, 'right'), get(margin, 'x'), margin));
  const mt = asDimension(firstDefined(ZSizeVoid.None, get(margin, 'top'), get(margin, 'y'), margin));
  const mb = asDimension(firstDefined(ZSizeVoid.None, get(margin, 'bottom'), get(margin, 'y'), margin));

  const bw = border?.width;
  const bl = asDimension(firstDefined(ZSizeVoid.None, get(bw, 'left'), get(bw, 'x'), bw));
  const br = asDimension(firstDefined(ZSizeVoid.None, get(bw, 'right'), get(bw, 'x'), bw));
  const bt = asDimension(firstDefined(ZSizeVoid.None, get(bw, 'top'), get(bw, 'y'), bw));
  const bb = asDimension(firstDefined(ZSizeVoid.None, get(bw, 'bottom'), get(bw, 'y'), bw));
  const bk = border?.style;

  useEffect(() => ZBoxElement.register(), []);
  useEffect(() => ZBoxBorderElement.register(), []);
  useEffect(() => ZBoxPaddingElement.register(), []);
  useEffect(() => ZBoxMarginElement.register(), []);

  const box = useRef<ZBoxElement>();
  useFashionWebComponent(box, fashion);
  useWidthWebComponent(box, $width);

  return (
    <z-box
      class={cssJoinDefined(className)}
      tabIndex={tabIndex}
      justification={justification}
      onClick={onClick}
      ref={box}
    >
      <z-box-margin left={ml} right={mr} top={mt} bottom={mb}>
        <z-box-border left={bl} right={br} top={bt} bottom={bb} kind={bk}>
          <z-box-padding left={pl} right={pr} top={pt} bottom={pb}>
            {children}
          </z-box-padding>
        </z-box-border>
      </z-box-margin>
    </z-box>
  );
}
