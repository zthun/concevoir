import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZAlertComponentModel } from '../alert/alert.cm.mjs';
import { ZButtonComponentModel } from '../button/button.cm.mjs';
import { ZSuspenseComponentModel } from '../suspense/suspense.cm.mjs';
import { ZTextComponentModel } from '../text/text.cm.mjs';

/**
 * The component model for the GridView component.
 */
export class ZGridViewComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZGridView-root';

  public search(): Promise<ZTextComponentModel> {
    return ZCircusBy.first(this.driver, ZTextComponentModel, 'search');
  }

  public more(): Promise<ZButtonComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZButtonComponentModel, 'grid-more');
  }

  public async error(): Promise<ZAlertComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZAlertComponentModel, 'grid-error');
  }

  public async loading(): Promise<boolean> {
    return ZSuspenseComponentModel.loading(this.driver, 'grid-loading');
  }

  public async load(): Promise<void> {
    await ZSuspenseComponentModel.load(this.driver, 'grid-loading');
  }
}
