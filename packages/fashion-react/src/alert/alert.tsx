import {
  ZAlertAvatarElement,
  ZAlertElement,
  ZAlertHeadingElement,
  ZAlertMessageElement
} from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useEffect, useRef } from 'react';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';
import { useFashionWebComponent } from '../fashion/use-web-component';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-alert']: ZAlertElement & any;
      ['z-alert-heading']: ZAlertHeadingElement & any;
      ['z-alert-message']: ZAlertMessageElement & any;
      ['z-alert-avatar']: ZAlertAvatarElement & any;
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
  useEffect(() => ZAlertHeadingElement.register(), []);
  useEffect(() => ZAlertMessageElement.register(), []);
  useEffect(() => ZAlertAvatarElement.register(), []);

  const alert = useRef<ZAlertElement>();
  useFashionWebComponent<ZAlertElement>(alert, fashion);

  return (
    <z-alert class={cssJoinDefined(className)} data-name={name} ref={alert}>
      {avatar ? <z-alert-avatar>{avatar}</z-alert-avatar> : null}
      {heading ? <z-alert-heading>{heading}</z-alert-heading> : null}
      <z-alert-message>{message}</z-alert-message>
    </z-alert>
  );
}
