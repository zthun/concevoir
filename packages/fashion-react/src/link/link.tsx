import { Link } from '@mui/material';
import { IZComponentName } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { noop } from 'lodash-es';
import React from 'react';
import { IZComponentLabel } from '../component/component-label.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

/**
 * Represents a link component (anchor tag).
 */
export interface IZLink extends IZComponentStyle, IZComponentName, IZComponentLabel {
  /**
   * The link url.
   */
  href?: string;

  /**
   * Occurs when the link is clicked.
   *
   * @param href -
   *        The reference that is being navigated to.  This is mostly for
   *        convenience.
   */
  onClick?(href: string): void;
}

/**
 * Basically a wrapper for an anchor tag in the browser.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZLink(props: IZLink) {
  const { className, name, href, label, onClick = noop } = props;

  const handleClick = () => {
    onClick(href);
  };

  return (
    <Link className={cssJoinDefined('ZLink-root', className)} href={href} data-name={name} onClick={handleClick}>
      {label}
    </Link>
  );
}
