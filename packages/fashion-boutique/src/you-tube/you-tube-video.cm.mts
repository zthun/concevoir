import { ZCircusComponentModel } from '@zthun/cirque';

/**
 * The component model for an embedded YouTube video.
 */
export class ZYouTubeVideoComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZYouTubeVideo-root';

  /**
   * Returns the video id that is currently embedded.
   *
   * @returns
   *        The video id that is embedded.
   */
  public identity(): Promise<string> {
    return this.driver.attribute<string>('data-identity', '?');
  }
}
