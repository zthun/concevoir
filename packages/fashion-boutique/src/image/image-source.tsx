import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { ZDataUrlBuilder } from "@zthun/webigail-url";
import { IZComponentHeight } from "../component/component-height.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentSource } from "../component/component-source.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentWidth } from "../component/component-width.mjs";
import { useFashionDevice } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZImageSource
  extends IZComponentSource,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentHeight,
    IZComponentName {}

const ImageSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

/**
 * Represents an image.
 *
 * This is a shortcut to placing an image tag, but it also supports svg data urls.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns The jsx for this component.
 */
export function ZImageSource(props: IZImageSource) {
  const device = useFashionDevice();
  const { className, src, height, width, name } = props;
  const _height = new ZDeviceValues(height, ZSizeVaried.Fit);
  const _width = new ZDeviceValues(width, ZSizeVaried.Fit);

  const _className = useCss(css`
    &,
    svg,
    img {
      width: ${ImageSizeChart[_width.xl]};
      height: ${ImageSizeChart[_height.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      &,
      svg,
      img {
        width: ${ImageSizeChart[_width.lg]};
        height: ${ImageSizeChart[_height.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      &,
      svg,
      img {
        width: ${ImageSizeChart[_width.md]};
        height: ${ImageSizeChart[_height.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      &,
      svg,
      img {
        width: ${ImageSizeChart[_width.sm]};
        height: ${ImageSizeChart[_height.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      &,
      svg,
      img {
        width: ${ImageSizeChart[_width.xs]};
        height: ${ImageSizeChart[_height.xs]};
      }
    }
  `);

  const imageClass = cssJoinDefined("ZImageSource-root", className, _className);

  if (!src) {
    return <div className={imageClass} data-name={name} />;
  }

  if (src.startsWith("data:image/svg+xml")) {
    // SVG images can go into html directly.
    const info = new ZDataUrlBuilder().parse(src).info();
    const __html = info.buffer.toString();
    return (
      <div
        className={imageClass}
        dangerouslySetInnerHTML={{ __html }}
        data-name={name}
      />
    );
  }

  return (
    <div className={imageClass} data-name={name}>
      <img src={src} alt={name} />
    </div>
  );
}
