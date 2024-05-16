import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSizeFixed,
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss
} from '@zthun/fashion-tailor';
import { ZFashionArea, ZFashionIntrinsic } from '@zthun/fashion-theme';
import { css, html, sleep } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentShadow,
  ZNode
} from '@zthun/spellcraft';
import { ZDeviceElement, ZPropertyDeviceHeight, ZPropertyDeviceWidth } from '../background/device-element.mjs';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentPop } from '../component/component-pop.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { closeOnBackdropClick, closeOnEscapeKey } from './dialog-events.mjs';
import { ZPropertyLazyElement } from './property-lazy-element.mjs';

@ZComponentRegister('z-modal')
@ZComponentClass('ZDialog-root', 'ZDialog-modal')
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.width() })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.height() })
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZModalElement extends HTMLElement implements IZComponentRender, IZComponentPop {
  public static readonly observedAttributes = Object.freeze(['fashion', 'persistent', 'fade']);

  public static readonly SizeChartWidth = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(10, 20), 'rem'),
    [ZSizeVaried.Full]: 'auto',
    [ZSizeVaried.Fit]: undefined
  });

  public static readonly SizeChartHeight = Object.freeze({
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(3, 20), 'rem'),
    [ZSizeVaried.Full]: 'auto',
    [ZSizeVaried.Fit]: undefined
  });

  private _closeOnBackdropClick = closeOnBackdropClick.bind(this);
  private _closeOnEscapeKey = closeOnEscapeKey.bind(this);

  @ZAttribute({ fallback: ZFashionIntrinsic.Transparent })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public persistent: boolean;

  @ZPropertyDeviceWidth(ZSizeVaried.Fit)
  public width: Required<IZDeviceValueMap<ZSizeFixed | ZSizeVaried>>;

  @ZPropertyDeviceHeight(ZSizeVaried.Fit)
  public height: Required<IZDeviceValueMap<ZSizeFixed | ZSizeVaried>>;

  @ZPropertyLazyElement('style')
  private readonly styleNode: HTMLStyleElement;

  @ZPropertyLazyElement('dialog')
  private readonly dialogNode: HTMLDialogElement;

  public styles() {
    const device = new ZFashionDevice();
    const { fashion, height, width } = this;
    const detail = new ZFashionDetail(fashion);
    const surface = new ZFashionDetail(ZFashionArea.Surface);
    const px = ZFashionTailorElement.gapVar(ZSizeFixed.Medium);
    const py = ZFashionTailorElement.gapVar(ZSizeFixed.Small);

    const marginFor = (x: ZSizeFixed | ZSizeVaried) => (x === ZSizeVaried.Full ? 0 : 'auto');

    return css`
      @keyframes fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      dialog {
        background-color: ${surface.color('main')};
        border: 0;
        color: ${surface.color('contrast')};
        height: ${ZModalElement.SizeChartHeight[height.xl]};
        margin-bottom: ${marginFor(height.xl)};
        margin-left: ${marginFor(width.xl)};
        margin-right: ${marginFor(width.xl)};
        margin-top: ${marginFor(height.xl)};
        max-height: 100%;
        max-width: 100%;
        padding: 0;
        transition: opacity 200ms ease-out;
        box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.75);
        width: ${ZModalElement.SizeChartWidth[width.xl]};
      }

      dialog[open] {
        animation: fade 200ms ease-in;
      }

      dialog.closing {
        opacity: 0;
      }

      .ZDialog-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .ZDialog-header,
      .ZDialog-content,
      .ZDialog-footer {
        flex-shrink: 0;
        flex-basis: 0;
        padding: ${py} ${px};
      }

      .ZDialog-header {
        background-color: ${detail.color('main')};
        color: ${detail.color('contrast')};
      }

      .ZDialog-content {
        flex-grow: 1;
        overflow: auto;
      }

      ${device.break(ZSizeFixed.Large)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.lg]};
          margin-bottom: ${marginFor(height.lg)};
          margin-left: ${marginFor(width.lg)};
          margin-right: ${marginFor(width.lg)};
          margin-top: ${marginFor(height.lg)};
          width: ${ZModalElement.SizeChartWidth[width.lg]};
        }
      }

      ${device.break(ZSizeFixed.Medium)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.md]};
          margin-bottom: ${marginFor(height.md)};
          margin-left: ${marginFor(width.md)};
          margin-right: ${marginFor(width.md)};
          margin-top: ${marginFor(height.md)};
          width: ${ZModalElement.SizeChartWidth[width.md]};
        }
      }

      ${device.break(ZSizeFixed.Small)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.sm]};
          margin-bottom: ${marginFor(height.sm)};
          margin-left: ${marginFor(width.sm)};
          margin-right: ${marginFor(width.sm)};
          margin-top: ${marginFor(height.sm)};
          width: ${ZModalElement.SizeChartWidth[width.sm]};
        }
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.xs]};
          margin-bottom: ${marginFor(height.xs)};
          margin-left: ${marginFor(width.xs)};
          margin-right: ${marginFor(width.xs)};
          margin-top: ${marginFor(height.xs)};
          width: ${ZModalElement.SizeChartWidth[width.xs]};
        }
      }
    `;
  }

  public template() {
    return html`
      <div class="ZDialog-container">
        <div class="ZDialog-header">
          <slot name="header"></slot>
        </div>
        <div class="ZDialog-content">
          <slot></slot>
        </div>
        <div class="ZDialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  public render(): void {
    const { dialogNode, styleNode } = this;

    dialogNode.removeEventListener('keydown', this._closeOnEscapeKey);
    dialogNode.removeEventListener('click', this._closeOnBackdropClick);

    new ZNode(dialogNode).clear().template(this.template());
    new ZNode(styleNode).clear().template(this.styles());

    dialogNode.addEventListener('keydown', this._closeOnEscapeKey);
    dialogNode.addEventListener('click', this._closeOnBackdropClick);
  }

  public async open(): Promise<void> {
    const { dialogNode } = this;
    this.setAttribute('data-open', 'true');
    dialogNode.showModal?.call(dialogNode);
    dialogNode.focus();
  }

  public async close(val?: string): Promise<void> {
    const { dialogNode } = this;
    dialogNode.classList.add('closing');
    await sleep(200);
    dialogNode.close?.call(dialogNode, val);
    dialogNode.classList.remove('closing');
    this.removeAttribute('data-open');
  }
}
