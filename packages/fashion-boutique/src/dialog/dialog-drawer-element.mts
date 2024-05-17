import { ZFashionArea, black } from '@zthun/fashion-theme';
import { ZHorizontalAnchor, ZSideAnchor, ZVerticalAnchor, css } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';
import { ZDialogElement } from './dialog-element.mjs';

@ZComponentRegister('z-dialog-drawer')
@ZComponentClass('ZDialog-root', 'ZDialog-drawer')
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZDialogDrawerElement extends ZDialogElement implements IZComponentRender {
  public static readonly observedAttributes = Object.freeze([...ZDialogElement.observedAttributes, 'anchor']);

  @ZAttribute({ fallback: ZHorizontalAnchor.Left })
  public anchor: ZSideAnchor;

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
}
