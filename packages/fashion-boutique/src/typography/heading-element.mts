import { ZFashionDevice, ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { IZComponentAttributeChanged, ZAttribute, nodePaint } from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { Property } from 'csstype';
import { IZComponentCompact } from '../component/component-compact.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZTypographyElement } from './typography.mjs';

export abstract class ZHeadingElement
  extends HTMLHeadingElement
  implements IZComponentAttributeChanged, IZComponentFashion, IZComponentCompact
{
  public static readonly observedAttributes = ['data-compact', 'data-fashion'];

  @ZAttribute({ name: 'data-compact', type: 'boolean' })
  public compact?: boolean;

  @ZAttribute({ name: 'data-fashion', fallback: ZFashionIntrinsic.Inherit })
  public fashion: string;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.classList.add('ZHeading-root');
    this.classList.add(`ZHeading-${this.tagName}`);
    this.attributeChangedCallback();
  }

  public scale(): number {
    return 3;
  }

  public transform(): Property.TextTransform {
    return 'none';
  }

  public attributeChangedCallback(): void {
    const { compact, fashion } = this;
    const device = new ZFashionDevice();
    const detail = new ZFashionDetail(fashion);
    const fs = ZTypographyElement.VariableFontSize;
    const ff = ZTypographyElement.VariableFontFamily;

    nodePaint(this.shadowRoot!);

    const styles = css`
      :host {
        color: ${detail.color('main')};
        font-family: ${ff};
        font-weight: bold;
        margin: 0;
        margin-bottom: ${compact ? 0 : ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
        text-transform: ${this.transform()};

        font-size: calc(${fs} * ${this.scale()} * 1);

        ${device.break(ZSizeFixed.Large)} {
          font-size: calc(${fs} * ${this.scale()} * 0.95);
        }

        ${device.break(ZSizeFixed.Medium)} {
          font-size: calc(${fs} * ${this.scale()} * 0.9);
        }

        ${device.break(ZSizeFixed.Small)} {
          font-size: calc(${fs} * ${this.scale()} * 0.85);
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          font-size: calc(${fs} * ${this.scale()} * 0.8);
        }
      }
    `;

    const template = html`<slot></slot>`;
    nodePaint(this.shadowRoot!, { css: styles, html: template });
  }
}
