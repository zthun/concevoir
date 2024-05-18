import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import {
  ZHorizontalAnchor,
  ZQuadrilateralBuilder,
  ZRectangle,
  ZVerticalAnchor,
  css,
  firstDefined
} from '@zthun/helpful-fn';
import {
  IZLifecycleConnected,
  IZLifecycleDisconnected,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentShadow,
  ZProperty
} from '@zthun/spellcraft';
import { ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZDialogElement } from './dialog-element.mjs';

@ZComponentRegister('z-dialog-popup')
@ZComponentClass('ZDialog-root', 'ZDialog-popup')
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentShadow()
export class ZDialogPopupElement extends ZDialogElement implements IZLifecycleConnected, IZLifecycleDisconnected {
  @ZAttribute({ fallback: ZHorizontalAnchor.Left })
  public originX: ZHorizontalAnchor;

  @ZAttribute({ fallback: ZVerticalAnchor.Top })
  public originY: ZVerticalAnchor;

  @ZAttribute({ fallback: ZHorizontalAnchor.Left })
  public anchorX: ZHorizontalAnchor;

  @ZAttribute({ fallback: ZVerticalAnchor.Bottom })
  public anchorY: ZVerticalAnchor;

  @ZProperty()
  public attach?: Element | null;

  private _calculatePosition = () => {
    const { dialogNode, attach, originX, originY, anchorX, anchorY } = this;

    const $attach = firstDefined(document.body, attach, this.parentElement);
    const tq = $attach.getBoundingClientRect();
    const cq = dialogNode.getBoundingClientRect();

    const targetRectangle = new ZRectangle(new ZQuadrilateralBuilder(0).right(tq.width).bottom(tq.height).build());
    const contentRectangle = new ZRectangle(new ZQuadrilateralBuilder(0).right(cq.width).bottom(cq.height).build());

    const { x: ax, y: ay } = targetRectangle.point([anchorY, anchorX]);
    const { x: ox, y: oy } = contentRectangle.point([originY, originX]);

    const left: number = tq.left + ax - ox;
    const top: number = tq.top + ay - oy;

    dialogNode.style.left = `${left}px`;
    dialogNode.style.top = `${top}px`;
    dialogNode.style.width = `${tq.width}px`;
  };

  public styles() {
    const { fashion } = this;
    const detail = new ZFashionDetail(fashion);
    const component = new ZFashionDetail(ZFashionArea.Component);

    return css`
      dialog {
        background-color: ${component.color('main')};
        border-color: ${component.color('border')};
        border-radius: ${ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraLarge)};
        border-style: solid;
        border-width: ${ZFashionTailorElement.thicknessVar(ZSizeFixed.ExtraSmall)};
        color: ${component.color('contrast')};
        padding: 0;
        margin: 0;
        z-index: 1000;
      }

      dialog::backdrop,
      dialog.closing {
        opacity: 0;
      }

      dialog[open] {
        display: flex;
        flex-direction: column;
      }

      .ZDialog-header,
      .ZDialog-footer,
      .ZDialog-content {
        flex-basis: 0;
        padding: ${ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
      }

      .ZDialog-header {
        background-color: ${detail.color('main')};
        color: ${detail.color('contrast')};
      }

      .ZDialog-content {
        flex-grow: 1;
      }
    `;
  }

  public async open(): Promise<void> {
    await super.open();
    this._calculatePosition();
  }

  public connectedCallback(): void {
    window.addEventListener('resize', this._calculatePosition);
    window.addEventListener('scroll', this._calculatePosition);
  }

  public disconnectedCallback(): void {
    window.removeEventListener('resize', this._calculatePosition);
    window.removeEventListener('scroll', this._calculatePosition);
  }
}
