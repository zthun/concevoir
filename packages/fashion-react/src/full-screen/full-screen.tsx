import { ZFullScreenElement } from '@zthun/fashion-boutique';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-full-screen']: ZFullScreenElement & any;
    }
  }
}
export function ZFullScreen(props: IZComponentHierarchy) {
  const { children } = props;
  useWebComponent(ZFullScreenElement);
  return <z-full-screen>{children}</z-full-screen>;
}
