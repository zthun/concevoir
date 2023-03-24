import { PaletteColor, useTheme } from '@mui/material';
import { createSpacing, ThemeProvider } from '@mui/system';
import { IZFashionDevice, IZFashionTailor, ZSizeFixed } from '@zthun/fashion-tailor';
import { IZFashion, IZFashionTheme } from '@zthun/fashion-theme';
import { firstDefined } from '@zthun/helpful-fn';
import React, { useMemo } from 'react';
import { createMakeStyles, CSSObject, GlobalStyles } from 'tss-react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { useFashionDevice, useFashionTailor, useFashionTheme } from './fashion';

function useBoutiqueTheme() {
  const mui = useTheme();
  const theme = useFashionTheme();
  const tailor = useFashionTailor();
  const device = useFashionDevice();

  mui.spacing = createSpacing((abs: number) => `${abs * 0.5}rem`);
  mui.components = firstDefined({}, mui.components);

  const setCoordination = (palette: PaletteColor, coordination: IZFashion) => {
    palette.main = coordination.main;
    palette.contrastText = coordination.contrast;
    palette.dark = firstDefined(coordination.main, coordination.dark);
    palette.light = firstDefined(coordination.main, coordination.light);
  };

  // Palette
  setCoordination(mui.palette.primary, theme.primary);
  setCoordination(mui.palette.secondary, theme.secondary);
  setCoordination(mui.palette.success, theme.success);
  setCoordination(mui.palette.warning, theme.warning);
  setCoordination(mui.palette.error, theme.error);
  setCoordination(mui.palette.info, theme.info);

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
        marginBottom: tailor.gap()
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
        paddingTop: tailor.gap(ZSizeFixed.Small),
        paddingBottom: tailor.gap(ZSizeFixed.Small)
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

  return Object.assign({}, mui, { theme, tailor, device });
}

function useGlobalStyles(fashion: IZFashion) {
  return useMemo(
    () => ({
      body: {
        backgroundColor: fashion.main,
        color: fashion.contrast,
        margin: 0
      }
    }),
    [fashion]
  );
}

const { makeStyles } = createMakeStyles({ useTheme: useBoutiqueTheme });

interface IZThemeUtility {
  theme: IZFashionTheme;
  tailor: IZFashionTailor;
  device: IZFashionDevice;
}

export function createStyleHook<T>(cb: (u: IZThemeUtility, p: T) => Record<string, CSSObject>): any;
export function createStyleHook(cb: (u: IZThemeUtility) => Record<string, CSSObject>): any;
export function createStyleHook<T>(cb: (u: IZThemeUtility, p?: T) => Record<string, CSSObject>) {
  return makeStyles<T>()((_theme, _props) => cb(_theme, _props));
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
  const { body } = useFashionTheme();
  const globals = useGlobalStyles(body);
  const theme = useBoutiqueTheme();

  return (
    <div className={className}>
      <GlobalStyles styles={globals} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}
