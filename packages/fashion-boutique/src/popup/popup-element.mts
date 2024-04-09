import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionArea } from '@zthun/fashion-theme';
import { IZComponentDisconnected, ZAttribute, ZComponentShadow } from '@zthun/helpful-dom';
import { ZAnchor, ZHorizontalAnchor, ZQuadrilateralBuilder, ZRectangle, ZVerticalAnchor } from '@zthun/helpful-fn';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';

export interface IZPopupOpenOptions {
  autoClose?: boolean;
  anchor?: ZAnchor;
  origin?: ZAnchor;
}

// @ZComponentPopper
@ZComponentShadow({ name: 'ZPopup', className: [] })
export class ZPopupElement extends HTMLElement implements IZComponentDisconnected {
  public static readonly observedProperties = ['fashion'];

  public static readonly EventOpened = 'z-popup-opened';
  public static readonly EventClosed = 'z-popup-closed';

  @ZAttribute({ fallback: ZFashionArea.Component })
  public fashion: string;

  private _destroy = () => this.close();
  private _keepOpen = (e: MouseEvent) => e.stopPropagation();

  private _root: HTMLDivElement | null;
  private _backdrop: HTMLDivElement | null;
  private _content: HTMLDivElement | null;

  private _escape = (e: KeyboardEvent) => {
    if (e.key === ZCircusKeyboardQwerty.escape.upper) {
      this.close();
    }
  };

  private _repositionContent(target: Element, options: Required<IZPopupOpenOptions>) {
    const content = this._content!;

    const tq = target.getBoundingClientRect();
    const cq = content.getBoundingClientRect();

    const targetRectangle = new ZRectangle(new ZQuadrilateralBuilder(0).right(tq.width).bottom(tq.height).build());
    const contentRectangle = new ZRectangle(new ZQuadrilateralBuilder(0).right(cq.width).bottom(cq.height).build());

    const { x: ax, y: ay } = targetRectangle.point(options.anchor);
    const { x: ox, y: oy } = contentRectangle.point(options.origin);

    const left: number = tq.left + ax - ox;
    const top: number = tq.top + ay - oy;

    content.style.left = `${left}px`;
    content.style.top = `${top}px`;
  }

  private _createContent() {
    const content = document.createElement('div');
    content.classList.add('ZPopup-content');

    content.style.position = 'absolute';
    content.style.backgroundColor = ZFashionThemeElement.variable(this.fashion, 'main');
    content.style.color = ZFashionThemeElement.variable(this.fashion, 'contrast');
    content.style.borderColor = ZFashionThemeElement.variable(this.fashion, 'border');
    content.style.borderWidth = '0.016rem';
    content.style.borderStyle = 'solid';
    content.style.padding = ZFashionTailorElement.gapVar(ZSizeFixed.Small);

    this.childNodes.forEach((ch) => {
      content.appendChild(ch.cloneNode(true));
    });

    return content;
  }

  private _createRoot() {
    const root = document.createElement('div');
    root.classList.add('ZPopup-root');
    return root;
  }

  private _createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.classList.add('ZPopup-backdrop');
    backdrop.style.position = 'absolute';
    backdrop.style.left = '0';
    backdrop.style.right = '0';
    backdrop.style.top = '0';
    backdrop.style.bottom = '0';
    return backdrop;
  }

  public open(target: Element, options?: IZPopupOpenOptions) {
    const _options: Required<IZPopupOpenOptions> = {
      autoClose: true,
      anchor: [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
      origin: [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
      ...options
    };

    if (this._root == null) {
      this._content = this._createContent();

      this._backdrop = this._createBackdrop();
      this._backdrop.appendChild(this._content);

      this._root = this._createRoot();
      this._root.appendChild(this._backdrop);

      document.body.appendChild(this._root);
      this.dispatchEvent(new CustomEvent(ZPopupElement.EventOpened));
    }

    document.body.removeEventListener('keydown', this._escape);

    this._repositionContent(target, _options);

    this._content!.removeEventListener('click', this._keepOpen);
    this._content!.addEventListener('click', this._keepOpen);

    this._backdrop!.removeEventListener('click', this._destroy);

    if (_options.autoClose) {
      this._backdrop!.addEventListener('click', this._destroy);
      document.body.addEventListener('keydown', this._escape);
    }
  }

  public close() {
    if (this._root == null) {
      return;
    }

    document.body.removeEventListener('keydown', this._escape);

    this._content?.removeEventListener('click', this._keepOpen);
    this._content = null;

    this._backdrop?.removeEventListener('click', this._destroy);
    this._backdrop = null;

    this._root.remove();
    this._root = null;

    this.dispatchEvent(new CustomEvent(ZPopupElement.EventClosed));
  }

  public disconnectedCallback(): void {
    this.close();
  }
}
