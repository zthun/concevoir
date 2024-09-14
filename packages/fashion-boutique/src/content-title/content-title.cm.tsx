import { IZCircusDriver, ZCircusComponentModel } from "@zthun/cirque";

export class ZContentTitleComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZContentTitle-root";

  private async part(
    name: "avatar" | "heading" | "sub-heading" | "prefix" | "suffix",
  ): Promise<IZCircusDriver | null> {
    const [part] = await this.driver.query(`.ZContentTitle-${name}`);
    return part || null;
  }

  public avatar(): Promise<IZCircusDriver | null> {
    return this.part("avatar");
  }

  public heading(): Promise<IZCircusDriver | null> {
    return this.part("heading");
  }

  public subHeading(): Promise<IZCircusDriver | null> {
    return this.part("sub-heading");
  }

  public prefix(): Promise<IZCircusDriver | null> {
    return this.part("prefix");
  }

  public suffix(): Promise<IZCircusDriver | null> {
    return this.part("suffix");
  }
}
