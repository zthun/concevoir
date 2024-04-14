import { IZComponentHierarchy, IZComponentRequired, ZLabelElement } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode } from 'react';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useWebComponent } from '../component/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-label']: ZLabelElement & any;
    }
  }
}

export interface IZLabel extends IZComponentHierarchy<ReactNode>, IZComponentStyle, IZComponentRequired {
  htmlFor?: string;
}

export function ZLabel(props: IZLabel) {
  const { children, className, required, htmlFor } = props;
  useWebComponent(ZLabelElement);

  return (
    <label
      is='z-label'
      // @ts-expect-error Should be class for web components
      class={cssJoinDefined(className)}
      for={htmlFor}
      data-required={required}
    >
      {children}
    </label>
  );
}
