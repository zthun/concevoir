import { IZDeviceValueMap, ZFashionDevice, ZSizeFixed } from '@zthun/fashion-tailor';
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
import { ZDeviceElement, ZPropertyDevice } from '../background/device-element.mjs';

export interface ZGridSpanElement extends IZComponentRender {}

@ZComponentRegister('z-grid-span')
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('column-start') })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('column-end') })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('row-start') })
@ZComponentRenderOnEvent('change', { selector: ZDeviceElement.selector('row-end') })
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZGridSpan-root')
@ZComponentShadow()
export class ZGridSpanElement extends HTMLElement implements IZComponentTemplate {
  @ZPropertyDevice('column-start', 'auto')
  public columnStart: Required<IZDeviceValueMap<Property.GridColumnStart>>;

  @ZPropertyDevice('column-end', 'auto')
  public columnEnd: Required<IZDeviceValueMap<Property.GridColumnEnd>>;

  @ZPropertyDevice('row-start', 'auto')
  public rowStart: Required<IZDeviceValueMap<Property.GridRowStart>>;

  @ZPropertyDevice('row-end', 'auto')
  public rowEnd: Required<IZDeviceValueMap<Property.GridRowEnd>>;

  public template() {
    const { columnStart, columnEnd, rowStart, rowEnd } = this;
    const device = new ZFashionDevice();

    return html`
      <style>
        :host {
          grid-column-start: ${columnStart.xl};
          grid-column-end: ${columnEnd.xl};
          grid-row-start: ${rowStart.xl};
          grid-row-end: ${rowEnd.xl};
        }

        ${device.break(ZSizeFixed.Large)} {
          :host {
            grid-column-start: ${columnStart.lg};
            grid-column-end: ${columnEnd.lg};
            grid-row-start: ${rowStart.lg};
            grid-row-end: ${rowEnd.lg};
          }
        }

        ${device.break(ZSizeFixed.Medium)} {
          :host {
            grid-column-start: ${columnStart.md};
            grid-column-end: ${columnEnd.md};
            grid-row-start: ${rowStart.md};
            grid-row-end: ${rowEnd.md};
          }
        }

        ${device.break(ZSizeFixed.Small)} {
          :host {
            grid-column-start: ${columnStart.sm};
            grid-column-end: ${columnEnd.sm};
            grid-row-start: ${rowStart.sm};
            grid-row-end: ${rowEnd.sm};
          }
        }

        ${device.break(ZSizeFixed.ExtraSmall)} {
          :host {
            grid-column-start: ${columnStart.xs};
            grid-column-end: ${columnEnd.xs};
            grid-row-start: ${rowStart.xs};
            grid-row-end: ${rowEnd.xs};
          }
        }
      </style>
      <slot></slot>
    `;
  }
}
