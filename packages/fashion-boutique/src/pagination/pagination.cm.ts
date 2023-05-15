import { ZCircusActBuilder, ZCircusComponentModel } from '@zthun/cirque';

/**
 * Represents the component model for the pagination component.
 */
export class ZPaginationComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZPagination-root';

  /**
   * Gets the current selected page.
   *
   * @returns
   *        The current page.  Returns null if no such page is selected.
   */
  public async value(): Promise<number | null> {
    const button = await this.driver.select('.MuiPaginationItem-page.Mui-selected');
    const page = await button.text();
    return +page;
  }

  /**
   * Returns the total number of pages that can be jumped.
   */
  public async count(): Promise<number> {
    const items = await this.driver.query('.MuiPaginationItem-page');
    return items.length;
  }

  private async _goToPage(aria: string) {
    const selector = `.MuiPaginationItem-root[aria-label="${aria}"]`;
    const [button] = await this.driver.query(selector);

    const disabled = await button?.disabled();

    if (disabled) {
      return await this.value();
    }

    const act = new ZCircusActBuilder().click().build();
    await button?.perform(act);
    return await this.value();
  }

  /**
   * Jumps to a specific page.
   *
   * @param page -
   *        The page number to jump to.
   *
   * @returns
   *        The page number you are on after the attempted
   *        jump.  If the jump cannot be made, then the current
   *        page is returned.
   */
  public jump(page: number) {
    return this._goToPage(`Go to page ${page}`);
  }

  /**
   * Navigates to the next page.
   *
   * @returns
   *        The page the list is on after the attempted
   *        navigation.
   */
  public next() {
    return this._goToPage('Go to next page');
  }

  /**
   * Navigates to the previous page.
   *
   * @returns
   *        The page the list is on after the attempted
   *        navigation.
   */
  public prev() {
    return this._goToPage('Go to previous page');
  }

  /**
   * Jumps to the first page.
   *
   * @returns
   *        The current page value after the jump is made.
   */
  public first(): Promise<number | null> {
    return this._goToPage('Go to first page');
  }

  /**
   * Jumps to the last page.
   *
   * @returns
   *        The current page value after the jump is made.
   */
  public last(): Promise<number | null> {
    return this._goToPage('Go to last page');
  }
}
