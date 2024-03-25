/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { IZFashion, IZFashionTheme, ZFashionName, ZFashionScope, ZFashionThemeBuilder } from '@zthun/fashion-theme';
import { IZComponentRender, ZComponentShadow, ZProperty, nodePaint } from '@zthun/helpful-dom';
import { kebabCase } from 'lodash-es';
import { ZFashionElement } from './fashion-element.mjs';

@ZComponentShadow({ name: 'ZFashionTheme', dependencies: [ZFashionElement] })
export class ZFashionThemeElement extends HTMLElement implements IZComponentRender {
  public static property<TCustomNames extends string = ZFashionName>(
    name: ZFashionName | TCustomNames,
    scope: ZFashionScope
  ) {
    return `--fashion-${kebabCase(name)}-${kebabCase(scope)}`;
  }

  @ZProperty({ initial: new ZFashionThemeBuilder().build(), attribute: (v) => v?.name })
  public theme: IZFashionTheme;

  public applyTheme(theme: IZFashionTheme): void {
    this.theme = theme;
  }

  private _renderFashion(fashion: IZFashion) {
    const _node = new ZFashionElement();
    this.shadowRoot?.appendChild(_node);
    _node.fashion = fashion;
  }

  public render(): void {
    nodePaint(this.shadowRoot!);

    this._renderFashion(this.theme.body);
    this._renderFashion(this.theme.component);
    this._renderFashion(this.theme.dark);
    this._renderFashion(this.theme.error);
    this._renderFashion(this.theme.info);
    this._renderFashion(this.theme.inherit);
    this._renderFashion(this.theme.light);
    this._renderFashion(this.theme.opposite);
    this._renderFashion(this.theme.primary);
    this._renderFashion(this.theme.secondary);
    this._renderFashion(this.theme.success);
    this._renderFashion(this.theme.surface);
    this._renderFashion(this.theme.transparent);
    this._renderFashion(this.theme.warning);
  }
}
