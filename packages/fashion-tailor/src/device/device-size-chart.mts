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
export interface IZDeviceSizeChart<TData> extends Partial<Record<ZSizeFixed, TData>> {
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
export function isDeviceSizeChart(x: any): x is IZDeviceSizeChart<any> {
  return x != null && Object.prototype.hasOwnProperty.call(x, 'xl');
}
