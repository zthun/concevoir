import { ZDeviceBounds, ZFashionDevice, ZSizeFixed } from '@zthun/fashion-tailor';
import { html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnConnected,
  ZComponentRenderOnEvent,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { Property } from 'csstype';
import { ZDeviceElement } from '../background/device-element.mjs';

export interface ZGridSpanElement extends IZComponentRender {}

@ZComponentRegister('z-grid-span')
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="column-start"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="column-end"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="row-start"]' })
@ZComponentRenderOnEvent('change', { selector: ':scope > z-device[name="row-end"]' })
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZGridSpan-root')
@ZComponentShadow()
export class ZGridSpanElement extends HTMLElement implements IZComponentTemplate {
  public template() {
    const device = new ZFashionDevice();

    const $columnStart = this.querySelector<ZDeviceElement>(':scope > z-device[name="column-start"]');
    const columnStart = new ZDeviceBounds<Property.GridColumnStart>($columnStart?.device?.call($columnStart), 'auto');

    const $columnEnd = this.querySelector<ZDeviceElement>(':scope > z-device[name="column-end"]');
    const columnEnd = new ZDeviceBounds<Property.GridColumnEnd>($columnEnd?.device?.call($columnEnd), 'auto');

    const $rowStart = this.querySelector<ZDeviceElement>(':scope > z-device[name="row-start"]');
    const rowStart = new ZDeviceBounds<Property.GridRowStart>($rowStart?.device?.call($rowStart), 'auto');

    const $rowEnd = this.querySelector<ZDeviceElement>(':scope > z-device[name="row-end"]');
    const rowEnd = new ZDeviceBounds<Property.GridRowEnd>($rowEnd?.device?.call($rowEnd), 'auto');

    return html`
      <style>
        :host {
          grid-column-start: ${columnStart.xl()};
          grid-column-end: ${columnEnd.xl()};
          grid-row-start: ${rowStart.xl()};
          grid-row-end: ${rowEnd.xl()};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            grid-column-start: ${columnStart.lg()};
            grid-column-end: ${columnEnd.lg()};
            grid-row-start: ${rowStart.lg()};
            grid-row-end: ${rowEnd.lg()};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            grid-column-start: ${columnStart.md()};
            grid-column-end: ${columnEnd.md()};
            grid-row-start: ${rowStart.md()};
            grid-row-end: ${rowEnd.md()};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            grid-column-start: ${columnStart.sm()};
            grid-column-end: ${columnEnd.sm()};
            grid-row-start: ${rowStart.sm()};
            grid-row-end: ${rowEnd.sm()};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            grid-column-start: ${columnStart.xs()};
            grid-column-end: ${columnEnd.xs()};
            grid-row-start: ${rowStart.xs()};
            grid-row-end: ${rowEnd.xs()};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
