import { serializeStyles } from '@emotion/serialize';
import { IZSerialize } from '@zthun/helpful-fn';
import { ZCssProperties } from './css-properties.mjs';

export class ZCssSerialize implements IZSerialize<ZCssProperties> {
  public serialize(properties: ZCssProperties<any>) {
    const { styles } = serializeStyles([properties]);
    return styles;
  }
}
