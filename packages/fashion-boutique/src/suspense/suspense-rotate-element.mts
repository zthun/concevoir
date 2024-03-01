import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss
} from '@zthun/fashion-tailor';
import { ZFashionContrast } from '@zthun/fashion-theme';
import {
  IZComponentConnected,
  IZComponentDisconnected,
  IZComponentRender,
  ZAttribute,
  ZComponentShadow
} from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { IZSuspense } from './suspense-element.mjs';

@ZComponentShadow({ name: 'ZSuspenseRotate', className: ['ZSuspense-root', 'ZSuspense-rotate'] })
export class ZSuspenseRotateElement
  extends HTMLElement
  implements IZSuspense, IZComponentConnected, IZComponentDisconnected, IZComponentRender
{
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');
  public static readonly observedAttributes = ['fashion', 'loading'];

  @ZAttribute({ fallback: ZFashionContrast.Opposite })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public loading?: boolean;

  public render(shadow: ShadowRoot) {
    const { fashion, loading } = this;
    const detail = new ZFashionDetail(fashion);
    const device = new ZFashionDevice();

    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeFixed.ExtraSmall);

    const xl = ZSuspenseRotateElement.SizeChart[width.xl()];
    const lg = ZSuspenseRotateElement.SizeChart[width.lg()];
    const md = ZSuspenseRotateElement.SizeChart[width.md()];
    const sm = ZSuspenseRotateElement.SizeChart[width.sm()];
    const xs = ZSuspenseRotateElement.SizeChart[width.xs()];

    const $css = css`
      @keyframes rotating {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      :host {
        display: ${loading ? 'block' : 'none'};
      }

      .ZSuspense-rotate-circle {
        animation: rotating 1s ease-in-out infinite;
        border-color: ${detail.color('border')};
        border-radius: 50%;
        border-style: dashed;
        box-shadow: 0 0 0.25rem ${detail.color('main')};

        height: ${xl};
        width: ${xl};

        ${device.break(ZSizeFixed.Large)} {
          height: ${lg};
          width: ${lg};
        }

        ${device.break(ZSizeFixed.Medium)} {
          height: ${md};
          width: ${md};
        }

        ${device.break(ZSizeFixed.Small)} {
          height: ${sm};
          width: ${sm};
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          height: ${xs};
          width: ${xs};
        }
      }
    `;

    const $html = html` <div class="ZSuspense-rotate-circle"></div> `;

    const style = document.createElement('style');
    style.textContent = $css;
    const template = document.createElement('template');
    template.innerHTML = $html;

    shadow.append(style);
    shadow.appendChild(template.content.cloneNode(true));
  }

  private _render = () => {
    if (!this.shadowRoot) {
      return;
    }

    while (this.shadowRoot.firstChild) {
      this.shadowRoot.firstChild.remove();
    }

    this.render(this.shadowRoot!);
  };

  public connectedCallback(): void {
    const $width = this.querySelector('z-device[name="width"]');
    $width?.addEventListener('change', this._render);
  }

  public disconnectedCallback(): void {
    const $width = this.querySelector('z-device[name="width"]');
    $width?.removeEventListener('change', this._render);
  }
}
