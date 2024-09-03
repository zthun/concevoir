import {
  IZComponentFashion,
  IZComponentLabel,
  IZComponentName,
  ZLinkElement,
} from "@zthun/fashion-boutique";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React, { ReactNode } from "react";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useWebComponent } from "../component/use-web-component.mjs";

/**
 * Represents a link component (anchor tag).
 */
export interface IZLink
  extends IZComponentStyle,
    IZComponentName,
    IZComponentLabel<ReactNode>,
    IZComponentFashion {
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
  const { className, fashion, name, href, label, onClick } = props;
  useWebComponent(ZLinkElement);

  return (
    <a
      // @ts-expect-error directives require class instead of className
      class={cssJoinDefined(className)}
      href={href}
      is="z-link"
      data-fashion={fashion}
      data-name={name}
      onClick={() => onClick?.call(this, href)}
    >
      {label}
    </a>
  );
}
