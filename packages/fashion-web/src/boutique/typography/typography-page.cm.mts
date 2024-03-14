import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import {
  ZBooleanComponentModel,
  ZChoiceComponentModel,
  ZHeadingComponentModel,
  ZParagraphComponentModel
} from '@zthun/fashion-circus';

export class ZTypographyPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTypographyPage-root';

  public h1(): Promise<ZHeadingComponentModel> {
    return ZCircusBy.first(this.driver, ZHeadingComponentModel, 'heading-1');
  }

  public h2(): Promise<ZHeadingComponentModel> {
    return ZCircusBy.first(this.driver, ZHeadingComponentModel, 'heading-2');
  }

  public h3(): Promise<ZHeadingComponentModel> {
    return ZCircusBy.first(this.driver, ZHeadingComponentModel, 'heading-3');
  }

  public h4(): Promise<ZHeadingComponentModel> {
    return ZCircusBy.first(this.driver, ZHeadingComponentModel, 'heading-4');
  }

  public h5(): Promise<ZHeadingComponentModel> {
    return ZCircusBy.first(this.driver, ZHeadingComponentModel, 'heading-5');
  }

  public h6(): Promise<ZHeadingComponentModel> {
    return ZCircusBy.first(this.driver, ZHeadingComponentModel, 'heading-6');
  }

  public body(): Promise<ZParagraphComponentModel> {
    return ZCircusBy.first(this.driver, ZParagraphComponentModel, 'body');
  }

  public subtitle(): Promise<ZParagraphComponentModel> {
    return ZCircusBy.first(this.driver, ZParagraphComponentModel, 'subtitle');
  }

  public caption(): Promise<ZParagraphComponentModel> {
    return ZCircusBy.first(this.driver, ZParagraphComponentModel, 'caption');
  }

  public overline(): Promise<ZParagraphComponentModel> {
    return ZCircusBy.first(this.driver, ZParagraphComponentModel, 'overline');
  }

  public fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'fashion');
  }

  public compact(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, 'compact');
  }
}
