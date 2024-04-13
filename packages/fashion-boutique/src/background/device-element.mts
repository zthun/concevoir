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
      const $device = this.querySelector<ZDeviceElement<K>>(`:scope > z-device[name="${name}"]`);
      const device = new ZDeviceBounds<K>($device?.device?.call($device), fallback);
      return device.toDeviceMap();
    }

    Object.defineProperty(target, propertyKey, {
      get
    });
  };
}
