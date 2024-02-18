import { ZBannerElement } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useEffect, useRef } from 'react';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHeight } from '../component/component-height.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useFashionWebComponent, useHeightWebComponent } from '../web-components/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-banner']: ZBannerElement & any;
    }
  }
}

export interface IZBanner
  extends IZComponentHierarchy,
    IZComponentFashion,
    Pick<IZComponentHeight<ZSizeFixed | ZSizeVaried.Fit>, 'height'>,
    IZComponentStyle {}

export function ZBanner(props: IZBanner) {
  const { children, className, fashion, height } = props;

  useEffect(() => ZBannerElement.register(), []);

  const banner = useRef<ZBannerElement>();
  useFashionWebComponent(banner, fashion);
  useHeightWebComponent(banner, height);

  return (
    <z-banner class={cssJoinDefined(className)} ref={banner}>
      {children}
    </z-banner>
  );
}
