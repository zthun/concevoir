import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { html, sleep } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentStyles,
  IZComponentTemplate,
  ZAttribute,
  ZNode,
  ZPropertyLazyElement
} from '@zthun/spellcraft';
import { IZComponentClose } from '../component/component-close.mjs';
import { IZComponentOpen } from '../component/component-open.mjs';
import { closeOnBackdropClick, closeOnEscapeKey } from './dialog-events.mjs';

export abstract class ZDialogElement
  extends HTMLElement
  implements IZComponentOpen, IZComponentClose, IZComponentStyles, IZComponentTemplate, IZComponentRender
{
  public static readonly observedAttributes = Object.freeze(['fashion', 'persistent']);

  private _closeOnBackdropClick = closeOnBackdropClick.bind(this);
  private _closeOnEscapeKey = closeOnEscapeKey.bind(this);

  @ZAttribute({ fallback: ZFashionIntrinsic.Transparent })
  public fashion: string;

  @ZAttribute({ type: 'boolean' })
  public persistent: boolean;

  @ZPropertyLazyElement('style')
  private readonly styleNode: HTMLStyleElement;

  @ZPropertyLazyElement('dialog')
  private readonly dialogNode: HTMLDialogElement;

  public abstract styles(): string;

  public template() {
    return html`
      <div class="ZDialog-container">
        <div class="ZDialog-header">
          <slot name="header"></slot>
        </div>
        <div class="ZDialog-content">
          <slot></slot>
        </div>
        <div class="ZDialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  public render(): void {
    const { dialogNode, styleNode } = this;

    dialogNode.removeEventListener('keydown', this._closeOnEscapeKey);
    dialogNode.removeEventListener('click', this._closeOnBackdropClick);

    new ZNode(dialogNode).clear().template(this.template());
    new ZNode(styleNode).clear().template(this.styles());

    dialogNode.addEventListener('keydown', this._closeOnEscapeKey);
    dialogNode.addEventListener('click', this._closeOnBackdropClick);
  }

  public async open(): Promise<void> {
    const { dialogNode } = this;
    this.setAttribute('data-open', 'true');
    dialogNode.showModal?.call(dialogNode);
    dialogNode.focus();
  }

  public async close(val?: string): Promise<void> {
    const { dialogNode } = this;
    dialogNode.classList.add('closing');
    await sleep(200);
    dialogNode.close?.call(dialogNode, val);
    dialogNode.classList.remove('closing');
    this.removeAttribute('data-open');
  }
}
