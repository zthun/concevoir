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
import { closeOnBackdropClick, closeOnEscapeKey, dispatchCloseEvent } from './dialog-events.mjs';

export interface ZModalElement extends IZComponentRender {}

@ZComponentRegister('z-modal')
@ZComponentClass('ZModal-root')
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

  private _dispatchClose = dispatchCloseEvent.bind(this);
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

  public styles() {
    const device = new ZFashionDevice();
    const { fashion, height, width } = this;
    const detail = new ZFashionDetail(fashion);
    const surface = new ZFashionDetail(ZFashionArea.Surface);
    const px = ZFashionTailorElement.gapVar(ZSizeFixed.Medium);
    const py = ZFashionTailorElement.gapVar(ZSizeFixed.Small);

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
        margin-bottom: ${height.xl === ZSizeVaried.Full ? 0 : 'auto'};
        margin-left: ${width.xl === ZSizeVaried.Full ? 0 : 'auto'};
        margin-right: ${width.xl === ZSizeVaried.Full ? 0 : 'auto'};
        margin-top: ${height.xl === ZSizeVaried.Full ? 0 : 'auto'};
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

      .ZModal-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .ZModal-header,
      .ZModal-content,
      .ZModal-footer {
        flex-shrink: 0;
        flex-basis: 0;
        padding: ${py} ${px};
      }

      .ZModal-header {
        background-color: ${detail.color('main')};
        color: ${detail.color('contrast')};
      }

      .ZModal-content {
        flex-grow: 1;
        overflow: auto;
      }

      ${device.break(ZSizeFixed.Large)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.lg]};
          width: ${ZModalElement.SizeChartWidth[width.lg]};
        }
      }

      ${device.break(ZSizeFixed.Medium)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.md]};
          width: ${ZModalElement.SizeChartWidth[width.md]};
        }
      }

      ${device.break(ZSizeFixed.Small)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.sm]};
          width: ${ZModalElement.SizeChartWidth[width.sm]};
        }
      }

      ${device.break(ZSizeFixed.ExtraSmall)} {
        dialog {
          height: ${ZModalElement.SizeChartHeight[height.xs]};
          width: ${ZModalElement.SizeChartWidth[width.xs]};
        }
      }
    `;
  }

  public template() {
    return html`
      <style>
        ${this.styles()}
      </style>
      <dialog>
        <div class="ZModal-container">
          <div class="ZModal-header">
            <slot name="header"></slot>
          </div>
          <div class="ZModal-content">
            <slot></slot>
          </div>
          <div class="ZModal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }

  public render(): void {
    let dialog = this.shadowRoot!.querySelector('dialog');
    dialog?.removeEventListener('cancel', this._dispatchClose);
    dialog?.removeEventListener('keydown', this._closeOnEscapeKey);
    dialog?.removeEventListener('click', this._closeOnBackdropClick);

    new ZNode(this.shadowRoot!).clear().template(this.template());

    dialog = this.shadowRoot!.querySelector('dialog');

    dialog?.addEventListener('cancel', this._dispatchClose);
    dialog?.addEventListener('keydown', this._closeOnEscapeKey);
    dialog?.addEventListener('click', this._closeOnBackdropClick);
  }

  public async open(): Promise<void> {
    const dialog = this.shadowRoot?.querySelector<HTMLDialogElement>('dialog');
    dialog?.showModal();
  }

  public async close(val?: string): Promise<void> {
    const dialog = this.shadowRoot?.querySelector<HTMLDialogElement>('dialog');
    dialog?.classList.add('closing');
    await sleep(200);
    dialog?.close(val);
    dialog?.classList.remove('closing');
  }
}
