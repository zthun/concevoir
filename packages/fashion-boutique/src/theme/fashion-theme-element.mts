/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { IZFashion, IZFashionTheme, ZFashionName, ZFashionScope, ZFashionThemeBuilder } from '@zthun/fashion-theme';
import {
  IZComponentRender,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnConnected,
  ZComponentRenderOnPropertyChanged,
  ZNode,
  ZProperty
} from '@zthun/spellcraft';
import { kebabCase } from 'lodash-es';
import { ZFashionElement } from './fashion-element.mjs';

export interface ZFashionThemeElement extends IZComponentRender {}

@ZComponentRegister('z-fashion-theme')
@ZComponentClass('ZFashionTheme-styles')
@ZComponentRenderOnPropertyChanged()
@ZComponentRenderOnConnected()
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

  private _renderFashion(to: Node, fashion: IZFashion) {
    const _node = new ZFashionElement();
    to.appendChild(_node);
    _node.fashion = fashion;
  }

  public render(node: Node): void {
    new ZNode(node).clear();

    this._renderFashion(node, this.theme.body);
    this._renderFashion(node, this.theme.component);
    this._renderFashion(node, this.theme.dark);
    this._renderFashion(node, this.theme.error);
    this._renderFashion(node, this.theme.info);
    this._renderFashion(node, this.theme.inherit);
    this._renderFashion(node, this.theme.light);
    this._renderFashion(node, this.theme.opposite);
    this._renderFashion(node, this.theme.primary);
    this._renderFashion(node, this.theme.secondary);
    this._renderFashion(node, this.theme.success);
    this._renderFashion(node, this.theme.surface);
    this._renderFashion(node, this.theme.transparent);
    this._renderFashion(node, this.theme.warning);
  }
}
