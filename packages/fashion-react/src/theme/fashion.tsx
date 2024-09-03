import {
  IZComponentHierarchy,
  ZFashionTailorElement,
  ZFashionThemeElement,
  ZFashionTypographyElement,
} from "@zthun/fashion-boutique";
import {
  IZFashionDevice,
  IZFashionTailor,
  ZFashionDevice,
  ZFashionTailor,
} from "@zthun/fashion-tailor";
import {
  IZFashionTheme,
  ZFashionName,
  ZFashionThemeBuilder,
} from "@zthun/fashion-theme";
import {
  IZFashionTypography,
  ZFashionTypographyBuilder,
} from "@zthun/fashion-typeface";
import { firstDefined } from "@zthun/helpful-fn";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

const ZFashionThemeContext = createContext(new ZFashionThemeBuilder().build());
const ZFashionTailorContext = createContext<IZFashionTailor>(
  new ZFashionTailor(),
);
const ZFashionDeviceContext = createContext<IZFashionDevice>(
  new ZFashionDevice(),
);

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-fashion-theme"]: ZFashionThemeElement & any;
      ["z-fashion-tailor"]: ZFashionTailorElement & any;
      ["z-fashion-typography"]: ZFashionTypographyElement & any;
    }
  }
}

export interface IZFashionThemeProvider
  extends IZComponentHierarchy<ReactNode> {
  theme?: IZFashionTheme;
  tailor?: IZFashionTailor;
  device?: IZFashionDevice;
  typography?: IZFashionTypography;
}

export function ZFashionThemeProvider(props: IZFashionThemeProvider) {
  const { theme, tailor, typography, device, children } = props;
  const _theme = useMemo(
    () => firstDefined(new ZFashionThemeBuilder().build(), theme),
    [theme],
  );
  const _tailor = useMemo(
    () => firstDefined(new ZFashionTailor(), tailor),
    [tailor],
  );
  const _device = useMemo(
    () => firstDefined(new ZFashionDevice(), device),
    [device],
  );
  const _typography = useMemo(
    () => firstDefined(new ZFashionTypographyBuilder().build(), typography),
    [typography],
  );

  const $theme = useRef<ZFashionThemeElement | null>(null);
  const $tailor = useRef<ZFashionTailorElement | null>(null);
  const $typography = useRef<ZFashionTypographyElement | null>(null);

  useEffect(() => $theme.current?.applyTheme(_theme), [_theme, $theme.current]);
  useEffect(
    () => $tailor.current?.applyTailor(_tailor),
    [$tailor.current, _tailor],
  );
  useEffect(
    () => $typography.current?.applyTypography(_typography),
    [$typography.current, _typography],
  );

  return (
    <>
      <z-fashion-theme ref={$theme}></z-fashion-theme>
      <z-fashion-tailor ref={$tailor}></z-fashion-tailor>
      <z-fashion-typography ref={$typography}></z-fashion-typography>

      <ZFashionThemeContext.Provider value={_theme}>
        <ZFashionTailorContext.Provider value={_tailor}>
          <ZFashionDeviceContext.Provider value={_device}>
            {children}
          </ZFashionDeviceContext.Provider>
        </ZFashionTailorContext.Provider>
      </ZFashionThemeContext.Provider>
    </>
  );
}

export function useFashionTheme<T extends object = {}>() {
  return useContext(ZFashionThemeContext) as IZFashionTheme<T>;
}

export function useFashion(name: ZFashionName | undefined) {
  const context = useFashionTheme();
  return name ? context[name] : undefined;
}

export function useFashionTailor() {
  return useContext(ZFashionTailorContext);
}

export function useFashionDevice() {
  return useContext(ZFashionDeviceContext);
}
