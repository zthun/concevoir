import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSize,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZDataUrlBuilder } from '@zthun/webigail-url';
import { ZDeviceElement, ZPropertyDeviceHeight, ZPropertyDeviceWidth } from '../background/device-element.mjs';

export interface ZImageSourceElement extends IZComponentRender {}

@ZComponentRegister('z-image-source')
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.height() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZImageSource-root')
@ZComponentShadow()
export class ZImageSourceElement extends HTMLElement implements IZComponentTemplate {
  public static readonly observedAttributes = Object.freeze(['src', 'name']);

  public static readonly SizeChart = {
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  };

  @ZAttribute()
  public name: string;

  @ZAttribute()
  public src: string;

  @ZAttribute({ name: 'data-kind', fallback: 'img' })
  public kind: 'img' | 'svg' | 'empty';

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSize>>;

  @ZPropertyDeviceHeight(ZSizeVaried.Fit)
  public height: Required<IZDeviceValueMap<ZSize>>;

  public template() {
    const { height, name, src, width } = this;
    const device = new ZFashionDevice();

    let imageHtml = html`<img src="${src}" alt="${name}" />`;
    this.kind = 'img';

    if (!src) {
      imageHtml = html`<div></div>`;
      this.kind = 'empty';
    }

    if (src.startsWith('data:image/svg+xml')) {
      // SVG images can go into html directly.
      const info = new ZDataUrlBuilder().parse(src).info();
      imageHtml = info.buffer.toString();
      this.kind = 'svg';
    }

    return html`
      <style>
        svg,
        img {
          height: ${ZImageSourceElement.SizeChart[height.xl]};
          width: ${ZImageSourceElement.SizeChart[width.xl]};
        }

        ${device.break(ZSizeFixed.Large)} {
          svg,
          img {
            height: ${ZImageSourceElement.SizeChart[height.lg]};
            width: ${ZImageSourceElement.SizeChart[width.lg]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          svg,
          img {
            height: ${ZImageSourceElement.SizeChart[height.md]};
            width: ${ZImageSourceElement.SizeChart[width.md]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          svg,
          img {
            height: ${ZImageSourceElement.SizeChart[height.sm]};
            width: ${ZImageSourceElement.SizeChart[width.sm]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          svg,
          img {
            height: ${ZImageSourceElement.SizeChart[height.xs]};
            width: ${ZImageSourceElement.SizeChart[width.xs]};
          }
        }
      </style>
      ${imageHtml}
      <slot></slot>
    `;
  }
}
