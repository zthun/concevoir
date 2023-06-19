import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZAlertComponentModel } from '../alert/alert.cm';
import { ZButtonComponentModel } from '../button/button.cm';
import { ZChoiceComponentModel } from '../choice/choice.cm';
import { ZPaginationComponentModel } from '../pagination/pagination.cm';
import { ZSuspenseComponentModel } from '../suspense/suspense.cm';
import { ZTextComponentModel } from '../text/text.cm';

/**
 * The component model for the GridView component.
 */
export class ZGridViewComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZGridView-root';

  public search(): Promise<ZTextComponentModel> {
    return ZCircusBy.first(this.driver, ZTextComponentModel, 'search');
  }

  public pagination(): Promise<ZPaginationComponentModel> {
    return ZCircusBy.first(this.driver, ZPaginationComponentModel);
  }

  public pageSize(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'page-size');
  }

  public refresh(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, 'refresh');
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
