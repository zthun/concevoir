import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { Fragment, useMemo } from "react";
import { ZLink } from "../link/link";
import { useLocation } from "../router/router-dom.mjs";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { ZParagraph } from "../typography/typography";
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
  const { body } = useFashionTheme();
  const tailor = useFashionTailor();
  const { className, name, home, onPathSelected } = props;
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

  const _className = css`
    & {
      color: ${body.idle.contrast};
      display: flex;
      flex-wrap: nowrap;
      gap: ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }
  `;

  const renderSection = (s: { name: string; path: string }, index: number) => {
    const href = `#${s.path}`;

    return (
      <Fragment key={s.path}>
        <ZLink
          className="ZBreadcrumbs-item"
          href={href}
          label={s.name}
          name={s.path}
          onClick={() => onPathSelected?.call(null, href)}
        />
        {index < sections.length - 1 && <ZParagraph compact>/</ZParagraph>}
      </Fragment>
    );
  };

  return (
    <div
      className={cssJoinDefined(
        "ZBreadcrumbs-root",
        "ZBreadcrumbs-location",
        _className,
        className,
      )}
      data-name={name}
    >
      {sections.map(renderSection)}
    </div>
  );
}
