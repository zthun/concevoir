import { Breadcrumbs } from "@mui/material";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React, { useMemo } from "react";
import { ZLink } from "../link/link";
import { useLocation } from "../router/router-dom.mjs";
import { createStyleHook } from "../theme/styled";
import { IZBreadcrumbs } from "./breadcrumbs.mjs";

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

const useBreadcrumbsStyles = createStyleHook(({ theme }) => ({
  root: {
    color: theme.body.idle.contrast,
  },
}));

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
  const sections = useMemo(() => {
    const all = location.pathname.split("/").filter((p) => !!p.trim());
    const _home = home
      ? { name: home.name, path: home.path || "/" }
      : undefined;
    const _sections: { name: string; path: string }[] = [];

    for (let i = 0; i < all.length; ++i) {
      const previous = _sections[i - 1]?.path || "";
      const name = all[i];
      const subPath = `${previous}/${name}`;
      _sections.push({ name, path: subPath });
    }

    return _home ? [_home, ..._sections] : _sections;
  }, [location, home]);
  const { classes } = useBreadcrumbsStyles();

  const renderSection = (s: { name: string; path: string }) => (
    <ZLink
      className="ZBreadcrumbs-item"
      key={s.path}
      href={`#${s.path}`}
      name={s.path}
      label={s.name}
      onClick={onClick}
    />
  );

  return (
    <Breadcrumbs
      className={cssJoinDefined(
        "ZBreadcrumbs-root",
        "ZBreadcrumbs-location",
        classes.root,
        className,
      )}
      data-name={name}
    >
      {sections.map(renderSection)}
    </Breadcrumbs>
  );
}
