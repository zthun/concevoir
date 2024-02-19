import { ZAlertElement } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useEffect, useRef } from 'react';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useFashionWebComponent } from '../web-components/use-web-component.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-alert']: ZAlertElement & any;
    }
  }
}

export interface IZAlert
  extends Omit<IZComponentHeading, 'subheader'>,
    IZComponentName,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentAvatar {
  message: ReactNode;
}

export function ZAlert(props: IZAlert) {
  const { heading, name, className, message, avatar, fashion } = props;
  useEffect(() => ZAlertElement.register(), []);

  const alert = useRef<ZAlertElement>();
  useFashionWebComponent<ZAlertElement>(alert, fashion);

  return (
    <z-alert class={cssJoinDefined(className)} data-name={name} ref={alert}>
      {avatar ? <div slot='avatar'>{avatar}</div> : null}
      {heading ? <div slot='heading'>{heading}</div> : null}
      <div slot='message'>{message}</div>
    </z-alert>
  );
}
