import { IZDeviceValueMap, ZDeviceBounds } from '@zthun/fashion-tailor';
import {
  IZComponentDispatch,
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentDispatch,
  ZComponentDispatchOnAttributeChanged,
  ZComponentRegister,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow,
  ZComponentTemplateNoDisplay
} from '@zthun/spellcraft';

export interface ZDeviceElement extends IZComponentDispatch, IZComponentRender, IZComponentTemplate {}

@ZComponentRegister('z-device')
@ZComponentDispatchOnAttributeChanged()
@ZComponentDispatch(new Event('change'))
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentTemplateNoDisplay()
@ZComponentShadow()
export class ZDeviceElement<T extends string = string> extends HTMLElement {
  public static readonly observedAttributes = ['xl', 'lg', 'md', 'sm', 'xs'];

  public static selector(name: string) {
    return `:scope > z-device[name="${name}"]`;
  }

  public static width = ZDeviceElement.selector.bind(null, 'width');
  public static height = ZDeviceElement.selector.bind(null, 'height');

  public device() {
    return { xl: this.xl, lg: this.lg, md: this.md, sm: this.sm, xs: this.xs };
  }

  @ZAttribute()
  public xl?: T;

  @ZAttribute()
  public lg?: T;

  @ZAttribute()
  public md?: T;

  @ZAttribute()
  public sm?: T;

  @ZAttribute()
  public xs?: T;
}

export function ZPropertyDevice<K extends string, T extends HTMLElement>(name: string, fallback: K) {
  return (target: T, propertyKey: string | symbol): void => {
    function get(this: T): Required<IZDeviceValueMap<K>> {
      const selector = ZDeviceElement.selector(name);
      const $device = this.querySelector<ZDeviceElement<K>>(selector);
      const device = new ZDeviceBounds<K>($device?.device?.call($device), fallback);
      return device.toDeviceMap();
    }

    Object.defineProperty(target, propertyKey, { get });
  };
}

export function ZPropertyDeviceWidth<K extends string, T extends HTMLElement>(fallback: K) {
  return ZPropertyDevice<K, T>('width', fallback);
}

export function ZPropertyDeviceHeight<K extends string, T extends HTMLElement>(fallback: K) {
  return ZPropertyDevice<K, T>('height', fallback);
}
