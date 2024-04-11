import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { sleep } from '@zthun/helpful-fn';
import { IZLifecycleConnected, IZLifecycleDisconnected, ZAttribute } from '@zthun/spellcraft';
import { IZComponentDisabled } from '../component/component-disabled.mjs';
import { IZComponentFashion } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';
import { IZComponentRequired } from '../component/component-required.mjs';

export abstract class ZBooleanElement<T>
  extends HTMLElement
  implements
    IZComponentFashion,
    IZComponentRequired,
    IZComponentName,
    IZComponentDisabled,
    IZLifecycleConnected,
    IZLifecycleDisconnected
{
  public static readonly observedAttributes = ['fashion', 'value', 'disabled', 'required', 'value'];

  @ZAttribute({ type: 'boolean' })
  public required: boolean;

  @ZAttribute({ type: 'boolean' })
  public disabled: boolean;

  @ZAttribute({ fallback: ZFashionPriority.Primary })
  public fashion: string;

  @ZAttribute()
  public name: string;

  public abstract value: T;

  private _handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key !== ZCircusKeyboardQwerty.enter.lower && e.key !== ZCircusKeyboardQwerty.space.lower) {
      return;
    }

    e.preventDefault();
    await this._handleClick();
  };

  private _handleClick = async () => {
    const { disabled } = this;

    if (disabled) {
      return;
    }

    await this.toggle();
    this.dispatchEvent(new Event('change', { composed: true, bubbles: true }));
    await sleep();
    this.shadowRoot?.querySelector<HTMLElement>('[role="checkbox"]')?.focus();
  };

  public abstract toggle(): Promise<void>;

  public connectedCallback(): void {
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  public disconnectedCallback(): void {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }
}
