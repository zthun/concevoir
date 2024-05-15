import { ZFashionArea } from '@zthun/fashion-theme';
import { ZHorizontalAnchor, ZVerticalAnchor, css, sleep } from '@zthun/helpful-fn';
import {
  IZLifecycleConnected,
  IZLifecycleDisconnected,
  ZComponentClass,
  ZComponentCss,
  ZComponentRegister
} from '@zthun/spellcraft';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';
import { closeOnBackdropClick } from './dialog-events.mjs';

@ZComponentRegister('z-drawer', { extend: 'dialog' })
@ZComponentClass('ZDrawer-root')
@ZComponentCss(
  css`
    .ZDrawer-root {
      background-color: ${ZFashionThemeElement.variable(ZFashionArea.Surface, 'main')};
      border: 0;
      color: ${ZFashionThemeElement.variable(ZFashionArea.Surface, 'contrast')};
      margin: 0;
      transition: transform 0.3s linear;
    }

    .ZDrawer-root[data-anchor='${ZHorizontalAnchor.Left}'] {
      height: 100%;
    }

    .ZDrawer-root::backdrop {
      background-color: #000000;
      opacity: 0.5;
    }

    @keyframes left-slide-in {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .ZDrawer-root:not([open]) {
      transform: translate(-100%, -100%);
    }

    .ZDrawer-root[data-anchor='${ZHorizontalAnchor.Left}'][open] {
      animation: left-slide-in 0.2s linear;
      transform: translateX(0);
    }

    .ZDrawer-root[data-anchor='${ZHorizontalAnchor.Left}'].closing {
      transform: translateX(-100%);
    }

    @keyframes right-slide-in {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .ZDrawer-root[data-anchor='${ZHorizontalAnchor.Right}'] {
      margin-left: auto;
      height: 100%;
    }

    .ZDrawer-root[data-anchor='${ZHorizontalAnchor.Right}'][open] {
      animation: right-slide-in 0.2s linear;
      transform: translateX(0);
    }

    .ZDrawer-root[data-anchor='${ZHorizontalAnchor.Right}'].closing {
      transform: translateX(100%);
    }

    @keyframes top-slide-in {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .ZDrawer-root[data-anchor='${ZVerticalAnchor.Top}'] {
      margin-bottom: auto;
      width: 100%;
    }

    .ZDrawer-root[data-anchor='${ZVerticalAnchor.Top}'][open] {
      animation: top-slide-in 0.2s linear;
    }

    .ZDrawer-root[data-anchor='${ZVerticalAnchor.Top}'].closing {
      transform: translateY(-100%);
    }

    @keyframes bottom-slide-in {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }

    .ZDrawer-root[data-anchor='${ZVerticalAnchor.Bottom}'] {
      margin-top: auto;
      width: 100%;
    }

    .ZDrawer-root[data-anchor='${ZVerticalAnchor.Bottom}'][open] {
      animation: bottom-slide-in 0.2s linear;
    }

    .ZDrawer-root[data-anchor='${ZVerticalAnchor.Bottom}'].closing {
      transform: translateY(100%);
    }
  `,
  { prefix: 'z-drawer' }
)
export class ZDrawerElement extends HTMLDialogElement implements IZLifecycleConnected, IZLifecycleDisconnected {
  private _closeOnBackdropClick = closeOnBackdropClick.bind(this);

  public connectedCallback(): void {
    this.addEventListener('click', this._closeOnBackdropClick);
  }

  public disconnectedCallback(): void {
    this.removeEventListener('click', this._closeOnBackdropClick);
  }

  public async close() {
    this.classList.add('closing');
    await sleep(300);
    super.close();
    this.classList.remove('closing');
  }
}
