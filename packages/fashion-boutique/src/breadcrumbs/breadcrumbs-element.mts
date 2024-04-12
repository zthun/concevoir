import { css } from '@zthun/helpful-fn';
import { IZComponentRender, ZComponentClass, ZComponentCss, ZComponentRegister } from '@zthun/spellcraft';

export interface ZBreadcrumbsElement extends IZComponentRender {}

@ZComponentRegister('z-breadcrumbs', { extend: 'nav' })
@ZComponentClass('ZBreadcrumbs-root')
@ZComponentCss(
  css`
    .ZBreadcrumbs-root {
      color: inherit;
      display: flex;
      position: relative;
    }
  `,
  { id: 'ZBreadcrumbs-styles' }
)
export class ZBreadcrumbsElement extends HTMLElement {}
