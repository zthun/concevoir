import { ZBreadcrumbElement, ZBreadcrumbsElement } from '@zthun/fashion-boutique';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useMemo } from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
import { useLocation } from '../router/router-dom.mjs';
import { IZBreadcrumbs } from './breadcrumbs.mjs';

/**
 * Represents the properties for the BreadcrumbsLocation component.
 */
export interface IZBreadcrumbsLocation extends IZBreadcrumbs {
  /**
   * Whether or not to include the home path as the first
   * item in the breadcrumb list.
   *
   * If this is set, then an additional item, name, will appear
   * as the first element of the breadcrumb trail and it will
   * route to the given optional path.  If path is not set,
   * then it will default to the root '/'.
   */
  home?: { name: string; path?: string };
}

/**
 * Represents a breadcrumbs component that uses the current location pathname.
 *
 * This supports the full pathname of the location.  If you are using
 * a disjoint sitemap where your site does not have a clear path and
 * route structure, then it would be recommended to avoid using this
 * component.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX that renders this component.
 */
export function ZBreadcrumbsLocation(props: IZBreadcrumbsLocation) {
  const { className, name, home, onClick } = props;
  const location = useLocation();
  useWebComponent(ZBreadcrumbElement);
  useWebComponent(ZBreadcrumbsElement);

  const sections = useMemo(() => {
    const all = location.pathname.split('/').filter((p) => !!p.trim());
    const _home = home ? { name: home.name, path: home.path || '/' } : undefined;
    const _sections: { name: string; path: string }[] = [];

    for (let i = 0; i < all.length; ++i) {
      const previous = _sections[i - 1]?.path || '';
      const name = all[i];
      const subPath = `${previous}/${name}`;
      _sections.push({ name, path: subPath });
    }

    _home ? [_home, ..._sections] : _sections;
    return _home ? [_home, ..._sections] : _sections;
  }, [location, home]);

  const renderSection = (s: { name: string; path: string }) => {
    const { name, path } = s;
    const href = `#${path}`;

    return (
      <a is='z-breadcrumb' key={path} href={href} data-name={path} onClick={() => onClick?.call(null, href)}>
        {name}
      </a>
    );
  };

  return (
    <nav
      // @ts-expect-error web components need to use class instead of className
      class={cssJoinDefined('ZBreadcrumbs-location', className)}
      is='z-breadcrumbs'
      data-name={name}
    >
      {sections.map(renderSection)}
    </nav>
  );
}
