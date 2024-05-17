import { ZFashionArea, black } from '@zthun/fashion-theme';
import { ZHorizontalAnchor, ZSideAnchor, ZVerticalAnchor, css, html, sleep } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentShadow,
  ZNode,
  ZPropertyLazyElement
} from '@zthun/spellcraft';
import { IZComponentPop } from '../component/component-pop.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';
import { closeOnBackdropClick, closeOnEscapeKey } from './dialog-events.mjs';

@ZComponentRegister('z-drawer')
@ZComponentClass('ZDialog-root', 'ZDialog-drawer')
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZDrawerElement extends HTMLElement implements IZComponentRender, IZComponentPop {
  public static readonly observedAttributes = ['anchor'];

  private _closeOnBackdropClick = closeOnBackdropClick.bind(this);
  private _closeOnEscapeKey = closeOnEscapeKey.bind(this);

  @ZAttribute({ fallback: ZHorizontalAnchor.Left })
  public anchor: ZSideAnchor;

  @ZPropertyLazyElement('style')
  private readonly styleNode: HTMLStyleElement;

  @ZPropertyLazyElement('dialog')
  private readonly dialogNode: HTMLDialogElement;

  public styles() {
    const { anchor } = this;
    let width: 'max-content' | '100%' = 'max-content';
    let height: 'max-content' | '100%' = '100%';
    let transformHide = 'translateX(-100%)';
    let transformShow = 'translateX(0)';
    let marginLeft: 'auto' | '0' = '0';
    let marginTop: 'auto' | '0' = '0';
    let marginBottom: 'auto' | '0' = '0';

    if (anchor === ZHorizontalAnchor.Right) {
      transformHide = 'translateX(100%)';
      marginLeft = 'auto';
    }

    if (anchor === ZVerticalAnchor.Bottom) {
      height = 'max-content';
      marginTop = 'auto';
      transformHide = 'translateY(100%)';
      transformShow = 'translateY(0)';
      width = '100%';
    }

    if (anchor === ZVerticalAnchor.Top) {
      height = 'max-content';
      marginBottom = 'auto';
      transformHide = 'translateY(-100%)';
      transformShow = 'translateY(0)';
      width = '100%';
    }

    return css`
      @keyframes slide-in {
        from {
          transform: ${transformHide};
        }
        to {
          transform: ${transformShow};
        }
      }

      dialog {
        background-color: ${ZFashionThemeElement.variable(ZFashionArea.Surface, 'main')};
        border: 0;
        color: ${ZFashionThemeElement.variable(ZFashionArea.Surface, 'contrast')};
        height: ${height};
        margin-bottom: ${marginBottom};
        margin-left: ${marginLeft};
        margin-right: 0;
        margin-top: ${marginTop};
        padding: 0;
        transform: ${transformHide};
        transition:
          transform 200ms linear,
          transform 200ms linear;
        width: ${width};
      }

      dialog::backdrop {
        background-color: ${black()};
        opacity: 0.75;
      }

      dialog[open] {
        animation: slide-in 200ms linear;
        transform: ${transformShow};
      }

      dialog.closing {
        transform: ${transformHide};
      }

      .ZDialog-container {
        display: flex;
        flex-direction: column;
      }

      .ZDialog-header,
      .ZDialog-footer {
        flex-basis: 0;
        flex-shrink: 1;
      }

      .ZDialog-content {
        flex-grow: 1;
      }
    `;
  }

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
