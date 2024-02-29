import { IZFashion, IZFashionTheme, ZFashionName, ZFashionScope } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { kebabCase } from 'lodash-es';

export class ZFashionThemeElement extends HTMLElement {
  public static register = registerCustomElement.bind(null, 'z-fashion-theme', ZFashionThemeElement);

  public static property<TCustomNames extends string = ZFashionName>(
    name: ZFashionName | TCustomNames,
    scope: ZFashionScope
  ) {
    return `--fashion-${kebabCase(name)}-${kebabCase(scope)}`;
  }

  public applyTheme(theme: IZFashionTheme): void {
    this.setFashionVariables(theme.body);
    this.setFashionVariables(theme.component);
    this.setFashionVariables(theme.dark);
    this.setFashionVariables(theme.error);
    this.setFashionVariables(theme.info);
    this.setFashionVariables(theme.inherit);
    this.setFashionVariables(theme.light);
    this.setFashionVariables(theme.opposite);
    this.setFashionVariables(theme.primary);
    this.setFashionVariables(theme.secondary);
    this.setFashionVariables(theme.success);
    this.setFashionVariables(theme.surface);
    this.setFashionVariables(theme.transparent);
    this.setFashionVariables(theme.warning);
  }

  public setFashionVariables(fashion: IZFashion): void {
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

    this.style.setProperty(ZFashionThemeElement.property(name, 'border'), border);
    this.style.setProperty(ZFashionThemeElement.property(name, 'contrast'), contrast);
    this.style.setProperty(ZFashionThemeElement.property(name, 'dark'), dark);
    this.style.setProperty(ZFashionThemeElement.property(name, 'light'), light);
    this.style.setProperty(ZFashionThemeElement.property(name, 'main'), main);

    this.style.setProperty(ZFashionThemeElement.property(name, 'focus.border'), focus.border);
    this.style.setProperty(ZFashionThemeElement.property(name, 'focus.contrast'), focus.contrast);
    this.style.setProperty(ZFashionThemeElement.property(name, 'focus.main'), focus.main);

    this.style.setProperty(ZFashionThemeElement.property(name, 'hover.border'), hover.border);
    this.style.setProperty(ZFashionThemeElement.property(name, 'hover.contrast'), hover.contrast);
    this.style.setProperty(ZFashionThemeElement.property(name, 'hover.main'), hover.main);

    this.style.setProperty(ZFashionThemeElement.property(name, 'active.border'), active.border);
    this.style.setProperty(ZFashionThemeElement.property(name, 'active.contrast'), active.contrast);
    this.style.setProperty(ZFashionThemeElement.property(name, 'active.main'), active.main);
  }
}
