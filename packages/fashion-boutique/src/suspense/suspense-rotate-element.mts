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

export class ZSuspenseRotateElement extends ZSuspenseElement implements IZComponentDisconnected {
  public static readonly register = registerCustomElement.bind(null, 'z-suspense-rotate', ZSuspenseRotateElement);
  public static readonly SizeChart = createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem');

  public constructor() {
    super();

    const device = new ZFashionDevice();
    const css = new ZCssSerialize().serialize({
      '@keyframes rotating': {
        from: {
          transform: 'rotate(0deg)'
        },
        to: {
          transform: 'rotate(360deg)'
        }
      },

      ':host': {
        'display': `${cssVariable('--suspense-display')}`,

        '.ZSuspense-rotate-circle': {
          animation: 'rotating 1s ease-in-out infinite',
          borderColor: cssVariable('--suspense-border'),
          borderRadius: '50%',
          borderStyle: 'dashed',
          boxShadow: `0 0 0.25rem ${cssVariable('--suspense-main')}`,

          height: cssVariable('--suspense-rotate-width-xl'),
          width: cssVariable('--suspense-rotate-width-xl'),

          [device.break(ZSizeFixed.Large)]: {
            height: cssVariable('--suspense-rotate-width-lg'),
            width: cssVariable('--suspense-rotate-width-lg')
          },

          [device.break(ZSizeFixed.Medium)]: {
            height: cssVariable('--suspense-rotate-width-md'),
            width: cssVariable('--suspense-rotate-width-md')
          },

          [device.break(ZSizeFixed.Small)]: {
            height: cssVariable('--suspense-rotate-width-sm'),
            width: cssVariable('--suspense-rotate-width-sm')
          },

          [device.break(ZSizeFixed.ExtraSmall)]: {
            height: cssVariable('--suspense-rotate-width-xs'),
            width: cssVariable('--suspense-rotate-width-xs')
          }
        }
      }
    });

    const style = document.createElement('style');
    style.textContent = css;

    const template = document.createElement('template');
    template.innerHTML = '<div class="ZSuspense-rotate-circle"></div>';

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(style);
    shadow.appendChild(template.content.cloneNode(true));
  }

  private _refreshWidth = () => {
    const { style } = this;

    const $width = this.querySelector<ZDeviceElement>('z-device[name="width"]');
    const width = new ZDeviceBounds($width?.device?.call($width), ZSizeFixed.ExtraSmall);

    const xl = ZSuspenseRotateElement.SizeChart[width.xl()];
    const lg = ZSuspenseRotateElement.SizeChart[width.lg()];
    const md = ZSuspenseRotateElement.SizeChart[width.md()];
    const sm = ZSuspenseRotateElement.SizeChart[width.sm()];
    const xs = ZSuspenseRotateElement.SizeChart[width.xs()];

    style.setProperty('--suspense-rotate-width-xl', xl);
    style.setProperty('--suspense-rotate-width-lg', lg);
    style.setProperty('--suspense-rotate-width-md', md);
    style.setProperty('--suspense-rotate-width-sm', sm);
    style.setProperty('--suspense-rotate-width-xs', xs);
  };

  public connectedCallback(): void {
    super.connectedCallback();
    this.classList.add('ZSuspense-rotate');

    const $width = this.querySelector('z-device[name="width"]');
    $width?.addEventListener('change', this._refreshWidth);

    this._refreshWidth();
  }

  public disconnectedCallback(): void {
    const $width = this.querySelector('z-device[name="width"]');
    $width?.removeEventListener('change', this._refreshWidth);
  }
}
