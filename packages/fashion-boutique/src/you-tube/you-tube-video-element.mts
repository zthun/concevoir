import { html } from '@zthun/helpful-fn';
import {
  IZComponentRender,
  IZComponentTemplate,
  ZAttribute,
  ZComponentClass,
  ZComponentRegister,
  ZComponentRenderOnAttributeChanged,
  ZComponentRenderOnConnected,
  ZComponentRenderTemplate,
  ZComponentShadow
} from '@zthun/spellcraft';
import { ZUrlBuilder, ZYouTubeApi } from '@zthun/webigail-url';

export interface ZYouTubeVideoElement extends IZComponentRender {}

// Note on the CSS - is isn't obvious why, but if you're seeing this, it's to force
// a 16x9 aspect ratio.  See https://css-tricks.com/fluid-width-video/
// for more information.
@ZComponentRegister('z-you-tube-video')
@ZComponentRenderOnAttributeChanged()
@ZComponentRenderOnConnected()
@ZComponentRenderTemplate()
@ZComponentClass('ZYouTubeVideo-root')
@ZComponentShadow()
export class ZYouTubeVideoElement extends HTMLElement implements IZComponentTemplate {
  public static readonly observedAttributes = Object.freeze(['identity', 'name']);

  @ZAttribute()
  public identity: string;

  @ZAttribute()
  public name: string;

  public template(): string {
    const { identity, name } = this;
    const src = new ZUrlBuilder().youTube(ZYouTubeApi.Embed, identity).build();

    const allow = [
      'accelerometer',
      'autoplay',
      'clipboard-write',
      'encrypted-media',
      'gyroscope',
      'picture-in-picture'
    ].join(';');

    return html`
      <style>
        :host {
          display: block;
          height: 0;
          overflow: hidden;
          padding-bottom: 56.25%;
          position: relative;
        }

        iframe {
          border: 0;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
      </style>
      <iframe src=${src} allow=${allow} allowfullscreen title=${name}></iframe>
    `;
  }
}
