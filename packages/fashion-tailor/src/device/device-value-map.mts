import { ZSizeFixed } from '../fixed/size-fixed.mjs';

/**
 * Represents a type of size chart for a device.
 *
 * Only xl is required and the remaining items should be calculated
 * from the previous.
 *
 * @param TData -
 *        The associated data to each device breakpoint.
 */
export interface IZDeviceValueMap<TData> extends Partial<Record<ZSizeFixed, TData>> {
  xl: TData;
}

/**
 * Gets whether x can be considered a device size chart.
 *
 * @param x -
 *        The value to test.
 * @returns
 *        True if x can be a device size chart.  False otherwise.
 */
export function isDeviceValueMap(x: any): x is IZDeviceValueMap<any> {
  return x != null && Object.prototype.hasOwnProperty.call(x, 'xl');
}

/**
 * Casts the data to a device value map.
 *
 * @param data -
 *        The data to cast.
 *
 * @returns
 *        Data as a fully populated {@link IZDeviceValueMap}.  Returns the fallback
 *        as a fully populated {@link IZDeviceValueMap} if data is null or undefined;
 */
export function castDeviceMap<TData>(
  data: TData | IZDeviceValueMap<TData> | null | undefined,
  fallback: TData
): Required<IZDeviceValueMap<TData>> {
  if (data == null) {
    return { xl: fallback, lg: fallback, md: fallback, sm: fallback, xs: fallback };
  }

  if (isDeviceValueMap(data)) {
    const { xl, lg = xl, md = lg, sm = md, xs = sm } = data;
    return { xl, lg, md, sm, xs };
  }

  return { xl: data, lg: data, md: data, sm: data, xs: data };
}
