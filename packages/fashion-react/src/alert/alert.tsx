import { IZComponentFashion, ZAlertElement } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useEffect } from 'react';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

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

  return (
    <z-alert class={cssJoinDefined(className)} fashion={fashion} name={name}>
      {avatar ? <div slot='avatar'>{avatar}</div> : null}
      {heading ? <div slot='heading'>{heading}</div> : null}
      <div slot='message'>{message}</div>
    </z-alert>
  );
}
