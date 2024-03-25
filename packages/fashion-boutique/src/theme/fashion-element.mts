/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { IZFashion, ZFashionBuilder, ZFashionScope } from '@zthun/fashion-theme';
import { IZComponentStyles, ZProperty } from '@zthun/helpful-dom';
import { css, firstDefined } from '@zthun/helpful-fn';
import { kebabCase } from 'lodash-es';
import { ZComponentStyle } from './component-style.mjs';

@ZComponentStyle({ name: 'ZFashion' })
export class ZFashionElement extends HTMLElement implements IZComponentStyles {
  @ZProperty({ initial: new ZFashionBuilder().build(), attribute: (f) => f?.name })
  public fashion: IZFashion;

  public property(scope: ZFashionScope) {
    return `--fashion-${this.fashion.name}-${kebabCase(scope)}`;
  }

  public styles() {
    const { main, contrast } = this.fashion;

    const border = firstDefined(main, this.fashion.border);
    const dark = firstDefined(main, this.fashion.dark);
    const light = firstDefined(main, this.fashion.light);

    const active = {
      border: firstDefined(main, this.fashion.active.border, this.fashion.active.main),
      contrast: firstDefined(contrast, this.fashion.active.contrast),
      main: firstDefined(main, this.fashion.active.main)
    };

    const focus = {
      border: firstDefined(main, this.fashion.focus.border, this.fashion.focus.main),
      contrast: firstDefined(contrast, this.fashion.focus.contrast),
      main: firstDefined(main, this.fashion.focus.main)
    };

    const hover = {
      border: firstDefined(main, this.fashion.hover.border, this.fashion.hover.main),
      contrast: firstDefined(contrast, this.fashion.hover.contrast),
      main: firstDefined(main, this.fashion.hover.main)
    };

    return css`
      html {
        ${this.property('main')}: ${main};
        ${this.property('contrast')}: ${contrast};
        ${this.property('border')}: ${border};
        ${this.property('dark')}: ${dark};
        ${this.property('light')}: ${light};

        ${this.property('focus.border')}: ${focus.border};
        ${this.property('focus.contrast')}: ${focus.contrast};
        ${this.property('focus.main')}: ${focus.main};

        ${this.property('hover.border')}: ${hover.border};
        ${this.property('hover.contrast')}: ${hover.contrast};
        ${this.property('hover.main')}: ${hover.main};

        ${this.property('active.border')}: ${active.border};
        ${this.property('active.contrast')}: ${active.contrast};
        ${this.property('active.main')}: ${active.main};
      }
    `;
  }
}
