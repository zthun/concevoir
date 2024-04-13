import {
  IZDeviceValueMap,
  ZFashionDevice,
  ZSizeFixed,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric
} from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { css } from '@zthun/helpful-fn';
import { IZComponentStyles, ZAttribute, ZComponentConstructor } from '@zthun/spellcraft';
import { ZPropertyDevice } from '../background/device-element.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { IZComponentName } from '../component/component-name.mjs';

export function ZComponentIcon<T extends HTMLElement>(fallback: string) {
  const SizeChart = createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), 'rem');

  return function (target: ZComponentConstructor<T>): any {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/58022
    class _ZIcon extends target implements IZComponentStyles, IZComponentName, IZComponentFashion {
      @ZAttribute({ fallback })
      public name: string;

      @ZAttribute({ fallback: ZFashionIntrinsic.Inherit })
      public fashion: string;

      @ZPropertyDevice('width', ZSizeFixed.Small)
      public readonly width: Required<IZDeviceValueMap<ZSizeFixed>>;

      public styles() {
        const { fashion, id, width } = this;
        const detail = new ZFashionDetail(fashion);
        const device = new ZFashionDevice();

        return css`
          #${id}.ZIcon-font, #${id} .ZIcon-font {
            color: ${detail.color('main')};
            font-size: ${SizeChart[width.xl]};
          }

          ${device.break(ZSizeFixed.Large)} {
            #${id}.ZIcon-font, #${id} .ZIcon-font {
              font-size: ${SizeChart[width.lg]};
            }
          }

          ${device.break(ZSizeFixed.Medium)} {
            #${id}.ZIcon-font, #${id} .ZIcon-font {
              font-size: ${SizeChart[width.md]};
            }
          }

          ${device.break(ZSizeFixed.Small)} {
            #${id}.ZIcon-font, #${id} .ZIcon-font {
              font-size: ${SizeChart[width.sm]};
            }
          }

          ${device.break(ZSizeFixed.ExtraSmall)} {
            #${id}.ZIcon-font, #${id} .ZIcon-font {
              font-size: ${SizeChart[width.xs]};
            }
          }
        `;
      }
    }

    return _ZIcon;
  };
}
