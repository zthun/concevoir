import { ZSadFaceElement } from '@zthun/fashion-boutique';
import React from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-sad-face']: ZSadFaceElement & any;
    }
  }
}

export function ZSadFace() {
  useWebComponent(ZSadFaceElement);
  return <z-sad-face />;
}
