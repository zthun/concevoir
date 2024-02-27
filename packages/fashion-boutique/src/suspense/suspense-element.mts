import { ZFashionContrast } from '@zthun/fashion-theme';
import { IZComponentAttributeChanged, IZComponentConnected, ZAttribute } from '@zthun/helpful-dom';
import { ZFashionDetail } from '../component/component-fashion.mjs';

export abstract class ZSuspenseElement
  extends HTMLElement
  implements IZComponentAttributeChanged, IZComponentConnected
{
  public static readonly observedAttributes = ['fashion', 'loading'];

  @ZAttribute({ fallback: ZFashionContrast.Opposite })
  public fashion: string;

  @ZAttribute({ type: 'boolean', fallback: true })
  public loading?: boolean;

  private _refreshFashion = () => {
    const { style } = this;

    const detail = new ZFashionDetail(this.fashion);
    style.setProperty('--suspense-dark', detail.color('dark'));
    style.setProperty('--suspense-main', detail.color('main'));
    style.setProperty('--suspense-contrast', detail.color('contrast'));
    style.setProperty('--suspense-border', detail.color('border'));
  };

  private _refreshLoading = () => {
    const { style } = this;

    style.setProperty('--suspense-display', this.loading ? 'block' : 'none');
  };

  public connectedCallback(): void {
    this.classList.add('ZSuspense-root');

    this._refreshFashion();
    this._refreshLoading();
  }

  public attributeChangedCallback(): void {
    this._refreshFashion();
    this._refreshLoading();
  }
}
