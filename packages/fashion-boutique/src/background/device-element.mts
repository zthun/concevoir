import { ZAttribute, ZComponentBackground } from '@zthun/helpful-dom';

@ZComponentBackground({ name: 'ZDevice' })
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
