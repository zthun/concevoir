import { ZAttribute, registerCustomElement } from '@zthun/helpful-dom';
import { ZBackgroundElement } from './background-element.mjs';

export class ZDeviceElement<T extends string | number = string> extends ZBackgroundElement {
  public static readonly register = registerCustomElement.bind(null, 'z-device', ZDeviceElement);
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
