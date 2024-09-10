import { css } from "@emotion/css";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { ZUrlBuilder, ZYouTubeApi } from "@zthun/webigail-url";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";

export interface IZYouTubeVideo extends IZComponentName, IZComponentStyle {
  identity: string;
}

export function ZYouTubeVideo(props: IZYouTubeVideo) {
  const { identity, className, name } = props;
  const src = new ZUrlBuilder().youTube(ZYouTubeApi.Embed, identity).build();
  const allow = [
    "accelerometer",
    "autoplay",
    "clipboard-write",
    "encrypted-media",
    "gyroscope",
    "picture-in-picture",
  ].join(";");

  // This isn't obvious why, but if you're seeing this, it's to force
  // a 16x9 aspect ratio.  See https://css-tricks.com/fluid-width-video/
  // for more information.
  const padding = "56.25%";

  const _className = css`
    & {
      overflow: hidden;
      padding-bottom: ${padding};
      position: relative;
      height: 0;
    }

    iframe {
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      border: 0;
    }
  `;

  return (
    <div
      className={cssJoinDefined("ZYouTubeVideo-root", className, _className)}
      data-identity={identity}
      data-name={name}
    >
      <iframe src={src} allow={allow} allowFullScreen title={name} />
    </div>
  );
}
