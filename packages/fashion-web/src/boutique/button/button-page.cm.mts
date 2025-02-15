import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZButtonComponentModel,
  ZChoiceComponentModel,
} from "@zthun/fashion-boutique";

/**
 * Represents the component model for the button demo page.
 */
export class ZButtonPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZButtonPage-root";

  /**
   * Gets the main button demo.
   *
   * @returns
   *        The main button component.
   */
  public async button(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "button");
  }

  /**
   * Gets the icon button demo.
   *
   * @returns
   *        The icon button component.
   */
  public async iconButton(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel, "icon-button");
  }

  /**
   * Gets the disabled option switch.
   *
   * @returns
   *        The disabled option switch.
   */
  public async disabled(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "disabled");
  }

  /**
   * Gets the outline option switch.
   *
   * @returns
   *        The outline option switch.
   */
  public async outline(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "outline");
  }

  /**
   * Gets the borderless option switch.
   *
   * @returns
   *        The borderless option switch.
   */
  public async borderless(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "borderless");
  }

  /**
   * Gets the fashion drop down.
   *
   * @returns
   *        The fashion drop down.
   */
  public async fashion(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "fashion");
  }

  /**
   * Gets the click count.
   *
   * @returns
   *        The click count.
   */
  public async count(): Promise<number> {
    const count = await this.driver.select(".ZButtonPage-click-count");
    const value = await count.text();
    return +value;
  }
}
