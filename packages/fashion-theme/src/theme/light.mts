import { ZFashionThemeBuilder } from "./fashion-theme.mjs";

/**
 * Constructs the default (light) theme.
 *
 * @returns The default (light) theme.
 */
export function createLightTheme() {
  return new ZFashionThemeBuilder().build();
}
