import { IZCircusDriver, ZCircusComponentModel } from '@zthun/cirque';
import { ZFashionArea } from '@zthun/fashion-theme';

/**
 * Represents a component model for a ZCard component.
 */
export class ZCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZCard-root';

  /**
   * Gets the fashion name of the card.
   *
   * @returns
   *        The fashion of the card.
   */
  public fashion(): Promise<string> {
    return this.driver.attribute<string>('fashion', ZFashionArea.Surface);
  }

  /**
   * Gets the text content of the heading.
   *
   * @returns
   *        The text content of the heading.
   */
  public async heading(): Promise<string> {
    const heading = await this.driver.select('[slot="heading"]');
    return heading.text();
  }

  /**
   * Gets the text content of the sub heading.
   *
   * @returns
   *        The text content of the sub heading.
   */
  public async subHeading(): Promise<string> {
    const subHeading = await this.driver.select('[slot="subheading"]');
    return subHeading.text();
  }

  /**
   * Gets whether the card is in a loading state.
   */
  public async loading(): Promise<boolean> {
    const content = await this.driver.attribute('loading');
    return content !== 'false';
  }

  /**
   * Gets the content area.
   *
   * @returns
   *        The driver to query the content area of the card.
   */
  public content(): Promise<IZCircusDriver> {
    return this.driver.select('[slot="body"]');
  }

  /**
   * Gets the footer area.
   *
   * @returns
   *        The driver to query the footer area of the card.
   *        Returns null if there is no footer.
   */
  public async footer(): Promise<IZCircusDriver | null> {
    const [footer] = await this.driver.query('[slot="footer"]');
    return footer || null;
  }
}
