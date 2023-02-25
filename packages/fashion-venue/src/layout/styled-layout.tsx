import { ThemeProvider } from '@mui/system';
import React from 'react';
import { GlobalStyles } from 'tss-react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { useFashionTheme, useGlobalStyles } from '../theme/theme';

/**
 * Properties for the styled layout.
 */
export interface IZStyledLayout extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents a styled layout at the root context.
 */
export function ZStyledLayout(props: IZStyledLayout) {
  const { children, className } = props;
  const globals = useGlobalStyles();
  const theme = useFashionTheme();

  return (
    <div className={className}>
      <GlobalStyles styles={globals} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}
