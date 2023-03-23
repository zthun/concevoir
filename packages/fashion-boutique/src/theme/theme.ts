import { Color, createTheme, PaletteColor, Theme } from '@mui/material';
import { createSpacing } from '@mui/system';
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedFibonacci,
  createSizeChartVoidCss,
  createSizeChartVoidZero,
  ZSizeFixed,
  ZSizeVoid
} from '@zthun/fashion-tailor';
import { colorify, IZFashion, IZFashionCoordination, IZFashionDesign } from '@zthun/fashion-theme';
import { firstDefined } from '@zthun/helpful-fn';
import { createContext, useContext } from 'react';
import { createMakeStyles, CSSInterpolation } from 'tss-react';
import { createDefaultFashionDesign } from '../fashion/fashion';

export type IZCss = CSSInterpolation;
export type IZColor = Color;

const GapChart = {
  ...createSizeChartFixedFibonacci(0.5, 1),
  ...createSizeChartVoidZero()
};

const ThicknessChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(0.0625, 0.0625), 'rem'),
  ...createSizeChartVoidCss()
};

/**
 * Mixin functions
 */
export interface IZThemeMixins {
  /**
   * Converts from a fashion object to a css color.
   *
   * @param fashion -
   *        The fashion to convert.
   *
   * @returns
   *        A CSS compatible color option.
   */
  colorify(fashion: IZFashion): string;

  /**
   * Gets the current fashion design and coordination for colors.
   *
   @returns
          The current fashion design.
   */
  design(): Readonly<IZFashionDesign>;

  /**
   * Converts a size enum to a spacing value.
   *
   * This is the same as calling spacing() with a direct
   * conversion table of size to spacing multiplier.  This mostly a
   * allows you to use spacing that is a little more reader friendly such as
   * gap(ZSizeFixed.Medium) instead of spacing(2).
   *
   * This is mostly appropriate for margin and padding.
   *
   * @param size -
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  gap(size?: ZSizeFixed | ZSizeVoid): string;

  /**
   * Similar to gap, but uses a smaller multiplier and a smaller
   * base conversion.
   *
   * This is mostly appropriate for border widths and outlines.
   *
   * @param size -
   *        The size to space out.
   *
   * @returns
   *        A CSS compatible size option.
   */
  thickness(size?: ZSizeFixed | ZSizeVoid): string;
}

/**
 * Represents a theme.
 *
 * This extends material main theme and adds
 * some helpers and size options.
 */
export interface IZTheme extends Theme, IZThemeMixins {}

/**
 * Constructs the default theme variables for fashion components.
 *
 * See https://www.npmjs.com/package/tss-react for more information.
 *
 * @returns
 *        The fashion theme.
 */
export function createDefaultFashionTheme(): IZTheme {
  const mui = createTheme() as IZTheme;
  const design = createDefaultFashionDesign();

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);
  mui.colorify = (fashion: IZFashion) => colorify(design.palette, fashion);
  mui.design = () => design;
  mui.gap = (size: ZSizeFixed | ZSizeVoid = ZSizeFixed.Medium): string => mui.spacing(GapChart[size]);
  mui.thickness = (size: ZSizeFixed | ZSizeVoid = ZSizeFixed.ExtraSmall): string => ThicknessChart[size];

  mui.components = firstDefined({}, mui.components);

  const setCoordination = (palette: PaletteColor, coordination: IZFashionCoordination) => {
    palette.main = mui.colorify(coordination.main);
    palette.contrastText = mui.colorify(coordination.contrast);
    palette.dark = mui.colorify(firstDefined(coordination.main, coordination.dark));
    palette.light = mui.colorify(firstDefined(coordination.main, coordination.light));
  };

  // Palette
  setCoordination(mui.palette.primary, mui.design().primary);
  setCoordination(mui.palette.secondary, mui.design().secondary);
  setCoordination(mui.palette.success, mui.design().success);
  setCoordination(mui.palette.warning, mui.design().warning);
  setCoordination(mui.palette.error, mui.design().error);
  setCoordination(mui.palette.info, mui.design().info);

  // Typography
  const fonts = "'Roboto', 'Arial', 'sans-serif'";
  mui.typography.fontFamily = fonts;
  mui.typography.body1.fontFamily = fonts;

  const createTypography = () => ({
    fontFamily: fonts
  });

  const createHeaderTypography = (fontSize: string) => ({
    ...createTypography(),
    fontSize: `calc(${fontSize} * 0.80)`,
    [mui.breakpoints.up('sm')]: {
      fontSize: `calc(${fontSize} * 0.85)`
    },
    [mui.breakpoints.up('md')]: {
      fontSize: `calc(${fontSize} * 0.90)`
    },
    [mui.breakpoints.up('lg')]: {
      fontSize: `calc(${fontSize} * 0.95)`
    },
    [mui.breakpoints.up('xl')]: {
      fontSize
    }
  });

  const createTextTypography = (fontSize: string) => ({
    ...createTypography(),
    fontSize: `calc(${fontSize} * 0.95)`,
    [mui.breakpoints.up('md')]: {
      fontSize
    }
  });

  mui.typography.h1 = createHeaderTypography('3rem');
  mui.typography.h2 = createHeaderTypography('2.5rem');
  mui.typography.h3 = createHeaderTypography('2rem');
  mui.typography.h4 = createHeaderTypography('1.5rem');
  mui.typography.h5 = createHeaderTypography('1.35rem');
  mui.typography.h6 = createHeaderTypography('1.15rem');

  mui.typography.body1 = createTextTypography('1rem');
  mui.typography.body2 = createTextTypography('1rem');
  mui.typography.subtitle1 = createTextTypography('1rem');
  mui.typography.subtitle2 = createTextTypography('1rem');
  mui.typography.caption = createTextTypography('0.9rem');
  mui.typography.overline = createTextTypography('0.9rem');

  mui.typography.button = createTextTypography('1rem');

  mui.components.MuiTypography = {
    styleOverrides: {
      gutterBottom: {
        marginBottom: mui.gap()
      }
    }
  };

  // Autocomplete
  mui.components.MuiAutocomplete = {
    styleOverrides: {
      clearIndicator: {
        fontSize: '1.2rem',
        visibility: 'visible'
      }
    }
  };

  // Card
  mui.components.MuiCardHeader = {
    styleOverrides: {
      avatar: {
        fontSize: '3rem'
      }
    }
  };
  mui.components.MuiCardMedia = {
    styleOverrides: {
      root: {
        objectFit: 'fill'
      }
    }
  };

  // Checkbox
  mui.components.MuiCheckbox = {
    styleOverrides: {
      root: {
        paddingTop: mui.gap(ZSizeFixed.Small),
        paddingBottom: mui.gap(ZSizeFixed.Small)
      }
    }
  };

  // Label
  mui.components.MuiFormLabel = {
    styleOverrides: {
      asterisk: {
        color: mui.palette.error.dark
      }
    }
  };

  // Inputs
  mui.components.MuiInputBase = {
    styleOverrides: {
      root: {
        minHeight: '3.5rem'
      }
    }
  };

  // Toolbar
  mui.components.MuiToolbar = {
    styleOverrides: {
      regular: {
        minHeight: '6em'
      }
    }
  };

  return mui;
}

export function createDefaultGlobalStyles(): IZCss {
  return {
    body: {
      backgroundColor: 'whitesmoke',
      margin: 0
    }
  };
}

export const ZFashionThemeContext = createContext(createDefaultFashionTheme());

export const useFashionTheme = () => useContext(ZFashionThemeContext);

export const ZGlobalStylesContext = createContext(createDefaultGlobalStyles());

export const useGlobalStyles = () => useContext(ZGlobalStylesContext);

export const { makeStyles } = createMakeStyles({ useTheme: useFashionTheme });
