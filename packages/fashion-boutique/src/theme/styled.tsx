import { PaletteColor, useTheme } from "@mui/material";
import { ThemeProvider, createSpacing } from "@mui/system";
import {
  IZFashionDevice,
  IZFashionTailor,
  ZSizeFixed,
} from "@zthun/fashion-tailor";
import { IZFashion, IZFashionTheme, black, white } from "@zthun/fashion-theme";
import { firstDefined } from "@zthun/helpful-fn";
import { useMemo } from "react";
import {
  CSSInterpolation,
  CSSObject,
  GlobalStyles,
  createMakeStyles,
} from "tss-react";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "./fashion.mjs";

function useBoutiqueTheme() {
  const mui = useTheme();
  const theme = useFashionTheme();
  const tailor = useFashionTailor();
  const device = useFashionDevice();

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);
  mui.components = firstDefined({}, mui.components);

  const setFashion = (palette: PaletteColor, coordination: IZFashion) => {
    palette.main = firstDefined(white(), coordination.idle.main);
    palette.contrastText = firstDefined(black(), coordination.idle.contrast);
    palette.dark = firstDefined(
      black(),
      coordination.idle.main,
      coordination.idle.border,
    );
    palette.light = firstDefined(white(), coordination.idle.contrast);
  };

  // Palette
  setFashion(mui.palette.primary, theme.primary);
  setFashion(mui.palette.secondary, theme.secondary);
  setFashion(mui.palette.success, theme.success);
  setFashion(mui.palette.warning, theme.warning);
  setFashion(mui.palette.error, theme.error);
  setFashion(mui.palette.info, theme.info);

  // Typography
  const fonts = "'Roboto', 'Arial', 'sans-serif'";
  mui.typography.fontFamily = fonts;
  mui.typography.body1.fontFamily = fonts;

  const createTypography = () => ({
    fontFamily: fonts,
  });

  const createHeaderTypography = (fontSize: string) => ({
    ...createTypography(),
    fontSize: `calc(${fontSize} * 0.60)`,
    [mui.breakpoints.up("sm")]: {
      fontSize: `calc(${fontSize} * 0.70)`,
    },
    [mui.breakpoints.up("md")]: {
      fontSize: `calc(${fontSize} * 0.80)`,
    },
    [mui.breakpoints.up("lg")]: {
      fontSize: `calc(${fontSize} * 0.90)`,
    },
    [mui.breakpoints.up("xl")]: {
      fontSize,
    },
  });

  const createTextTypography = (fontSize: string) => ({
    ...createTypography(),
    fontSize: `calc(${fontSize} * 0.95)`,
    [mui.breakpoints.up("md")]: {
      fontSize,
    },
  });

  mui.typography.h1 = createHeaderTypography("3rem");
  mui.typography.h2 = createHeaderTypography("2.5rem");
  mui.typography.h3 = createHeaderTypography("2rem");
  mui.typography.h4 = createHeaderTypography("1.5rem");
  mui.typography.h5 = createHeaderTypography("1.35rem");
  mui.typography.h6 = createHeaderTypography("1.15rem");

  mui.typography.body1 = createTextTypography("1rem");
  mui.typography.body2 = createTextTypography("1rem");
  mui.typography.subtitle1 = createTextTypography("1rem");
  mui.typography.subtitle2 = createTextTypography("1rem");
  mui.typography.caption = createTextTypography("0.9rem");
  mui.typography.overline = createTextTypography("0.9rem");

  mui.typography.button = createTextTypography("1rem");

  mui.components.MuiTypography = {
    styleOverrides: {
      gutterBottom: {
        marginBottom: tailor.gap(),
      },
    },
  };

  // Autocomplete
  mui.components.MuiAutocomplete = {
    styleOverrides: {
      clearIndicator: {
        fontSize: "1.2rem",
        visibility: "visible",
      },
    },
  };

  // Card
  mui.components.MuiCardHeader = {
    styleOverrides: {
      avatar: {
        fontSize: "3rem",
      },
    },
  };
  mui.components.MuiCardMedia = {
    styleOverrides: {
      root: {
        objectFit: "fill",
      },
    },
  };

  // Checkbox
  mui.components.MuiCheckbox = {
    styleOverrides: {
      root: {
        paddingTop: tailor.gap(ZSizeFixed.Small),
        paddingBottom: tailor.gap(ZSizeFixed.Small),
      },
    },
  };

  // Label
  mui.components.MuiFormLabel = {
    styleOverrides: {
      asterisk: {
        color: mui.palette.error.dark,
      },
    },
  };

  // Inputs
  mui.components.MuiInputBase = {
    styleOverrides: {
      root: {
        minHeight: "3.5rem",
      },
    },
  };

  return useMemo(
    () => Object.assign({}, mui, { theme, tailor, device }),
    [theme, tailor, device, mui],
  );
}

function useGlobalStyles() {
  const { body } = useFashionTheme();
  return useMemo<CSSInterpolation>(
    () => ({
      body: {
        backgroundColor: body.idle.main,
        color: body.idle.contrast,
        margin: 0,
        position: "relative",
        height: "100vh",
      },
    }),
    [body],
  );
}

const { makeStyles } = createMakeStyles({ useTheme: useBoutiqueTheme });

export interface IZThemeUtility<TCustom extends object = {}> {
  theme: IZFashionTheme<TCustom>;
  tailor: IZFashionTailor;
  device: IZFashionDevice;
}

export type ZStyleHook<T, R extends string> = (params?: T) => {
  classes: Record<R, string>;
};

export function createStyleHook<T, U extends object, R extends string>(
  cb: (u: IZThemeUtility<U>, p?: T) => Record<R, CSSObject>,
): ZStyleHook<T, R> {
  return makeStyles<T | undefined>()((_theme, _props) =>
    cb(_theme as unknown as IZThemeUtility<U>, _props),
  );
}

/**
 * Properties for the styled application.
 */
export interface IZStyled extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents the root element that sets the overall theme.
 *
 * Runways will always use this as the root element.
 */
export function ZStyled(props: IZStyled) {
  const { children, className } = props;
  const globals = useGlobalStyles();
  const theme = useBoutiqueTheme();

  return (
    <div className={className}>
      <GlobalStyles styles={globals} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}
