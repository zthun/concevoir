import {
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss
} from '@zthun/fashion-tailor';
import { IZComponentDisconnected, cssVariable, registerCustomElement } from '@zthun/helpful-dom';
import { ZDeviceElement } from '../background/device-element.mjs';
import { ZCssSerialize } from '../css/css-serialize.mjs';
import { ZSuspenseElement } from './suspense-element.mjs';

export class ZSuspenseProgressElement extends ZSuspenseElement implements IZComponentDisconnected {
  public static readonly register = registerCustomElement.bind(null, 'z-suspense-progress', ZSuspenseProgressElement);
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(0.25, 0.25), 'rem');

  public constructor() {
    super();

    const device = new ZFashionDevice();
    const css = new ZCssSerialize().serialize({
      '@keyframes scroll': {
        from: {
          transform: 'translateX(-100%)'
        },
        to: {
          transform: 'translateX(400%)'
        }
      },

      ':host': {
        'display': cssVariable('--suspense-display'),

        '.ZSuspense-progress-bar': {
          backgroundColor: cssVariable('--suspense-main'),
          boxShadow: `0 0 0.5rem ${cssVariable('--suspense-border')}`,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',

          height: cssVariable('--suspense-progress-height-xl'),

          [device.break(ZSizeFixed.Large)]: {
            height: `${cssVariable('--suspense-progress-height-lg')}`
          },

          [device.break(ZSizeFixed.Medium)]: {
            height: `${cssVariable('--suspense-progress-height-md')}`
          },

          [device.break(ZSizeFixed.Small)]: {
            height: `${cssVariable('--suspense-progress-height-sm')}`
          },

          [device.break(ZSizeFixed.ExtraSmall)]: {
            height: `${cssVariable('--suspense-progress-height-xs')}`
          }
        },

        '.ZSuspense-progress-scroll': {
          animation: 'scroll 1.5s ease-in-out infinite',
          position: 'absolute',
          backgroundColor: cssVariable('--suspense-contrast'),
          bottom: 0,
          left: 0,
          top: 0,
          width: '25%'
        }
      }
    });

    const style = document.createElement('style');
    style.textContent = css;

    const template = document.createElement('template');
    template.innerHTML = `
      <div class="ZSuspense-progress-bar">
        <div class="ZSuspense-progress-scroll">
        </div>
      </div>
    `;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(style);
    shadow.appendChild(template.content.cloneNode(true));
  }

  private _refreshHeight = () => {
    const { style } = this;

    const $height = this.querySelector<ZDeviceElement>('z-device[name="height"]');
    const height = new ZDeviceBounds($height?.device?.call($height), ZSizeFixed.ExtraSmall);

    const xl = ZSuspenseProgressElement.SizeChart[height.xl()];
    const lg = ZSuspenseProgressElement.SizeChart[height.lg()];
    const md = ZSuspenseProgressElement.SizeChart[height.md()];
    const sm = ZSuspenseProgressElement.SizeChart[height.sm()];
    const xs = ZSuspenseProgressElement.SizeChart[height.xs()];

    style.setProperty('--suspense-progress-height-xl', xl);
    style.setProperty('--suspense-progress-height-lg', lg);
    style.setProperty('--suspense-progress-height-md', md);
    style.setProperty('--suspense-progress-height-sm', sm);
    style.setProperty('--suspense-progress-height-xs', xs);
  };

  public connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('ZSuspense-progress');

    const $height = this.querySelector('z-device[name="height"]');
    $height?.addEventListener('change', this._refreshHeight);

    this._refreshHeight();
  }

  public disconnectedCallback(): void {
    const $height = this.querySelector('z-device[name="height"]');
    $height?.removeEventListener('change', this._refreshHeight);
  }
}
