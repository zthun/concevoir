import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSize,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss
} from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import { html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentClass,
  ZComponentDependencies,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZDeviceElement, ZPropertyDeviceHeight, ZPropertyDeviceWidth } from '../background/device-element.mjs';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZHeadingTwoElement } from '../typography/heading-2-element.mjs';
import { ZParagraphCaptionElement } from '../typography/paragraph-caption-element.mjs';

export interface ZCardElement extends IZComponentRender {}

@ZComponentRegister('z-card')
@ZComponentDependencies([ZHeadingTwoElement, ZParagraphCaptionElement])
@ZComponentClass('ZCard-root')
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.height() })
@ZComponentRenderTemplate()
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZCardElement extends HTMLElement implements IZComponentTemplate {
  public static readonly observedAttributes = ['fashion', 'loading'];

  public static readonly WidthChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.5, 10), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  public static readonly HeightChart = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(5, 20), 'rem'),
    ...createSizeChartVariedCss(),
    ...createSizeChartVoidCss()
  });

  @ZAttribute({ fallback: ZFashionArea.Surface })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public loading: boolean;

  @ZPropertyDeviceHeight(ZSizeVaried.Fit)
  public height: Required<IZDeviceValueMap<ZSize>>;

  @ZPropertyDeviceWidth(ZSizeVaried.Full)
  public width: Required<IZDeviceValueMap<ZSize>>;

  public template() {
    const { fashion, height, width } = this;

    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    return html`
      <style>
        @keyframes ZCard-gradient {
          0% {
            background-position-y: 0%;
          }
          50% {
            background-position-y: 100%;
          }
          100% {
            background-position-y: 0%;
          }
        }

        :host {
          background-color: ${detail.color('main')};
          box-shadow: 0 0.2rem 8pt #101010;
          color: ${detail.color('contrast')};
          display: flex;
          flex-direction: column;
          padding: ${ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
          max-width: ${ZCardElement.WidthChart[width.xl]};
          min-height: ${ZCardElement.HeightChart[height.xl]};
        }

        :host([loading='true']) {
          animation: ZCard-gradient 1.5s linear infinite;
          background: linear-gradient(0, ${detail.color('main')}, ${detail.color('dark')}, ${detail.color('main')});
          background-size: 100% 300%;
        }

        .ZCard-avatar {
          font-size: 1.75rem;
          margin-right: ${ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
        }

        .ZCard-heading,
        .ZCard-subheading {
          overflow: hidden;
        }

        .ZCard-heading {
          grid-area: heading;
        }

        .ZCard-subheading {
          grid-area: subheading;
        }

        .ZCard-avatar {
          grid-area: avatar;
        }

        .ZCard-header {
          align-items: center;
          display: grid;
          grid-template-columns: auto 1fr;
          margin-bottom: ${ZFashionTailorElement.gapVar(ZSizeFixed.Medium)};
          min-height: 1rem;

          grid-template-areas:
            'avatar heading'
            'avatar subheading';
        }

        .ZCard-body {
          border-bottom: none;
          border-top: none;
          flex-basis: 0;
          flex-grow: 1;
        }

        .ZCard-footer {
          border-top: none;
        }

        ::slotted([slot='heading']),
        ::slotted([slot='subheading']) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        ::slotted([slot='footer']) {
          margin-top: ${ZFashionTailorElement.gapVar(ZSizeFixed.Medium)};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            max-width: ${ZCardElement.WidthChart[width.lg]};
            min-height: ${ZCardElement.HeightChart[height.lg]};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            max-width: ${ZCardElement.WidthChart[width.md]};
            min-height: ${ZCardElement.HeightChart[height.md]};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            max-width: ${ZCardElement.WidthChart[width.sm]};
            min-height: ${ZCardElement.HeightChart[height.sm]};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            max-width: ${ZCardElement.WidthChart[width.xs]};
            min-height: ${ZCardElement.HeightChart[height.xs]};
          }
        }
      </style>
      <header class="ZCard-header">
        <div class="ZCard-avatar">
          <slot name="avatar"></slot>
        </div>
        <h2 class="ZCard-heading" is="z-h2" data-compact="true">
          <slot name="heading"></slot>
        </h2>
        <p class="ZCard-subheading" is="z-paragraph-caption" data-compact="true">
          <slot name="subheading"></slot>
        </p>
      </header>
      <article class="ZCard-body">
        <slot name="body"></slot>
      </article>
      <footer class="ZCard-footer">
        <slot name="footer"></slot>
      </footer>
      <slot></slot>
    `;
  }
}
