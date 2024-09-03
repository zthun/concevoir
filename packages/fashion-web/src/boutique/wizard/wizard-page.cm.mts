import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZWizardComponentModel,
} from "@zthun/fashion-circus";

export class ZWizardPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZWizardPage-root";

  public wizard(): Promise<ZWizardComponentModel> {
    return Promise.resolve(new ZWizardComponentModel(this.driver));
  }

  public understood(): Promise<ZBooleanComponentModel | null> {
    return ZCircusBy.optional(
      this.driver,
      ZBooleanComponentModel,
      "understand",
    );
  }
}
