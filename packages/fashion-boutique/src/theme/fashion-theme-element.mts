/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { IZFashion, IZFashionTheme, ZFashionName, ZFashionScope } from '@zthun/fashion-theme';
import { IZComponentStyles } from '@zthun/helpful-dom';
import { css, firstDefined } from '@zthun/helpful-fn';
import { kebabCase, set } from 'lodash-es';
import { ZComponentStyle } from './component-style.mjs';

export interface ZFashionThemeElement {
  render(): void;
}

@ZComponentStyle({ name: 'ZFashionTheme' })
export class ZFashionThemeElement extends HTMLElement implements IZComponentStyles {
  private _fashions: Record<string, string> = {};

  public static property<TCustomNames extends string = ZFashionName>(
    name: ZFashionName | TCustomNames,
    scope: ZFashionScope
  ) {
    return `--fashion-${kebabCase(name)}-${kebabCase(scope)}`;
  }

  public applyTheme(theme: IZFashionTheme): void {
    this.applyFashion(theme.body);
    this.applyFashion(theme.component);
    this.applyFashion(theme.dark);
    this.applyFashion(theme.error);
    this.applyFashion(theme.info);
    this.applyFashion(theme.inherit);
    this.applyFashion(theme.light);
    this.applyFashion(theme.opposite);
    this.applyFashion(theme.primary);
    this.applyFashion(theme.secondary);
    this.applyFashion(theme.success);
    this.applyFashion(theme.surface);
    this.applyFashion(theme.transparent);
    this.applyFashion(theme.warning);

    this.setAttribute('data-theme', theme.name);
  }

  public applyFashion(fashion: IZFashion): void {
    const { contrast, main, name } = fashion;

    const border = firstDefined(main, fashion.border);
    const dark = firstDefined(main, fashion.dark);
    const light = firstDefined(main, fashion.light);

    const active = {
      border: firstDefined(main, fashion.active.border, fashion.active.main),
      contrast: firstDefined(contrast, fashion.active.contrast),
      main: firstDefined(main, fashion.active.main)
    };

    const focus = {
      border: firstDefined(main, fashion.focus.border, fashion.focus.main),
      contrast: firstDefined(contrast, fashion.focus.contrast),
      main: firstDefined(main, fashion.focus.main)
    };

    const hover = {
      border: firstDefined(main, fashion.hover.border, fashion.hover.main),
      contrast: firstDefined(contrast, fashion.hover.contrast),
      main: firstDefined(main, fashion.hover.main)
    };

    set(this._fashions, ZFashionThemeElement.property(name, 'border'), border);
    set(this._fashions, ZFashionThemeElement.property(name, 'contrast'), contrast);
    set(this._fashions, ZFashionThemeElement.property(name, 'dark'), dark);
    set(this._fashions, ZFashionThemeElement.property(name, 'light'), light);
    set(this._fashions, ZFashionThemeElement.property(name, 'main'), main);

    set(this._fashions, ZFashionThemeElement.property(name, 'focus.border'), focus.border);
    set(this._fashions, ZFashionThemeElement.property(name, 'focus.contrast'), focus.contrast);
    set(this._fashions, ZFashionThemeElement.property(name, 'focus.main'), focus.main);

    set(this._fashions, ZFashionThemeElement.property(name, 'hover.border'), hover.border);
    set(this._fashions, ZFashionThemeElement.property(name, 'hover.contrast'), hover.contrast);
    set(this._fashions, ZFashionThemeElement.property(name, 'hover.main'), hover.main);

    set(this._fashions, ZFashionThemeElement.property(name, 'active.border'), active.border);
    set(this._fashions, ZFashionThemeElement.property(name, 'active.contrast'), active.contrast);
    set(this._fashions, ZFashionThemeElement.property(name, 'active.main'), active.main);

    this.render();
  }

  public styles() {
    const variables = Object.keys(this._fashions).map((key) => {
      const value = this._fashions[key];
      return `${key}: ${value}`;
    });

    return css`
      html {
        ${variables.join(';\n')}
      }
    `;
  }
}
