import { setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import {
  IZCircusDriver,
  IZCircusSetup,
  ZCircusBy,
  ZCircusComponentConstructor,
  ZCircusComponentModel
} from '@zthun/cirque';
import { ZCircusSetupChrome } from '@zthun/cirque-du-selenium';
import { sleep } from '@zthun/helpful-fn';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZRoute } from '../src/route/route';

/**
 * Represents a modifiable set of parameters.
 */
export interface IZFashionPage<T extends ZCircusComponentModel | never> {
  /**
   * The page component model.
   */
  page: T;
}

/**
 * The current world
 */
export class ZFashionWorld<T extends ZCircusComponentModel | never = never> extends World<IZFashionPage<T>> {
  private _browser: IZCircusSetup<IZCircusDriver> | null;
  private _driver: IZCircusDriver | null = null;

  /**
   * Closes the browser if it is open.
   */
  public async close() {
    await this._browser?.destroy?.call(this._browser);
    await this._driver?.destroy?.call(this._driver);
    this._browser = null;
    this._driver = null;
  }

  /**
   * Constructs a new page component model from the internal driver.
   *
   * @param model -
   *        The model to construct.
   *
   * @returns
   *        A new component model of type T.
   */
  public async create<T extends ZCircusComponentModel>(model: ZCircusComponentConstructor<T>): Promise<T> {
    const driver = await this.open();
    return ZCircusBy.first(driver, model);
  }

  /**
   * Opens the application and navigates to the given route.
   *
   * @param route -
   *        The full route path to open.
   * @returns
   *        The driver that points to the root element.
   */
  public async open(...route: (string | IZRoute)[]) {
    if (this._driver != null) {
      return this._driver;
    }

    let hash = route.map((r) => (typeof r === 'string' ? r : r.path)).join('/');
    hash = hash.startsWith('/') ? hash : `/${hash}`;
    const url = new ZUrlBuilder().parse('http://localhost:5173').hash(hash).build();
    this._browser = new ZCircusSetupChrome(url);
    this._driver = await this._browser.setup();
    await sleep(500);
    return this._driver;
  }
}

setDefaultTimeout(30000);
setWorldConstructor(ZFashionWorld);
