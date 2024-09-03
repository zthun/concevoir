import {
  IZDeviceValueMap,
  ZDeviceBounds,
  ZFashionDevice,
  ZSizeFixed,
} from "@zthun/fashion-tailor";
import { ZFashionIntrinsic } from "@zthun/fashion-theme";
import { firstTruthy, html } from "@zthun/helpful-fn";
import {
  IZComponentTemplate,
  ZAttribute,
  ZComponentConstructor,
} from "@zthun/spellcraft";
import { Property } from "csstype";
import { ZFashionDetail } from "../component/component-fashion.mjs";
import { ZFashionTailorElement } from "../theme/fashion-tailor-element.mjs";
import { ZFashionTypographyElement } from "../theme/fashion-typography-element.mjs";

export type ZHtmlTypographyElement = HTMLParagraphElement | HTMLHeadingElement;

export interface IZTypographyOptions {
  scale?: IZDeviceValueMap<number>;
  transform?: Property.TextTransform;
  weight?: Property.FontWeight;
}

export function ZComponentTemplateTypography<
  TElement extends ZHtmlTypographyElement,
>(options?: IZTypographyOptions) {
  const scale = firstTruthy({ xl: 1 }, options?.scale);
  const _scale = new ZDeviceBounds(scale, 1);
  const transform = firstTruthy("none", options?.transform);
  const weight = firstTruthy("normal", options?.weight);

  return (target: ZComponentConstructor<TElement>): any => {
    // @ts-expect-error See https://github.com/microsoft/TypeScript/issues/37142
    class _Typography extends target implements IZComponentTemplate {
      public static readonly observedAttributes = [
        "data-compact",
        "data-fashion",
      ];

      @ZAttribute({ name: "data-compact", type: "boolean" })
      public compact: boolean;

      @ZAttribute({ name: "data-fashion", fallback: ZFashionIntrinsic.Inherit })
      public fashion: string;

      public template() {
        const { compact, fashion } = this;
        const device = new ZFashionDevice();
        const detail = new ZFashionDetail(fashion);
        const fs = ZFashionTypographyElement.VariableFontSize;
        const ff = ZFashionTypographyElement.VariableFontFamily;

        return html`
          <style>
            :host {
              color: ${detail.color("main")};
              font-family: ${ff};
              font-weight: ${weight};
              font-decoration: italic;
              margin: 0;
              margin-bottom: ${compact
                ? 0
                : ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
              text-transform: ${transform};

              font-size: calc(${fs} * ${_scale.xl()});
            }

            ${device.break(ZSizeFixed.Large)} {
              :host {
                font-size: calc(${fs} * ${_scale.lg()});
              }
            }

            ${device.break(ZSizeFixed.Medium)} {
              :host {
                font-size: calc(${fs} * ${_scale.md()});
              }
            }

            ${device.break(ZSizeFixed.Small)} {
              :host {
                font-size: calc(${fs} * ${_scale.sm()});
              }
            }

            ${device.break(ZSizeFixed.ExtraSmall)} {
              :host {
                font-size: calc(${fs} * ${_scale.xs()});
              }
            }
          </style>
          <slot></slot>
        `;
      }
    }

    return _Typography;
  };
}
