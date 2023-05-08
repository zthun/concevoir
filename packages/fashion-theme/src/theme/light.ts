import { ZFashionThemeBuilder } from './fashion-theme';

/**
 * Constructs the default (light) theme.
 *
 * @returns The default (light) theme.
 */
export function createLightTheme() {
  return new ZFashionThemeBuilder().build();
}
