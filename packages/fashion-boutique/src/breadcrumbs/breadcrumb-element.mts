import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { css } from '@zthun/helpful-fn';
import { IZComponentRender, ZComponentClass, ZComponentCss, ZComponentRegister } from '@zthun/spellcraft';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export interface ZBreadcrumbElement extends IZComponentRender {}

@ZComponentRegister('z-breadcrumb', { extend: 'a' })
@ZComponentClass('ZBreadcrumb-root')
@ZComponentCss(
  css`
    .ZBreadcrumb-root {
      color: ${ZFashionThemeElement.variable(ZFashionPriority.Primary, 'main')};
      text-decoration: none;
    }

    .ZBreadcrumb-root:hover {
      color: ${ZFashionThemeElement.variable(ZFashionPriority.Primary, 'hover.main')};
    }

    .ZBreadcrumb-root:focus {
      color: ${ZFashionThemeElement.variable(ZFashionPriority.Primary, 'focus.main')};
    }

    .ZBreadcrumb-root + .ZBreadcrumb-root::before {
      color: ${ZFashionThemeElement.variable(ZFashionPriority.Secondary, 'main')};
      content: '/';
      margin-left: ${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)};
      margin-right: ${ZFashionTailorElement.gapVar(ZSizeFixed.ExtraSmall)};
    }
  `,
  { id: 'ZBreadcrumb-styles' }
)
export class ZBreadcrumbElement extends HTMLAnchorElement {}
