import { IZComponentAttributeChanged, ZAttribute } from '@zthun/helpful-dom';
import { ZCssSerialize } from '../css/css-serialize.mjs';

export abstract class ZBackgroundElement extends HTMLElement implements IZComponentAttributeChanged {
  @ZAttribute()
  public name: string;

  public constructor() {
    super();

    const style = document.createElement('style');
    style.textContent = new ZCssSerialize().serialize({
      ':host': {
        display: 'none'
      }
    });
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(style);
  }

  public attributeChangedCallback(): void {
    const e = new Event('change', {});
    this.dispatchEvent(e);
  }
}
