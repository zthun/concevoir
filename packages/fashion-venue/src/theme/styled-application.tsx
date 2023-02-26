import { ThemeProvider } from '@mui/system';
import React from 'react';
import { GlobalStyles } from 'tss-react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { useFashionTheme, useGlobalStyles } from './theme';

/**
 * Properties for the styled application.
 */
export interface IZStyledApplication extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents the root element that sets the overall theme.
 *
 * Runways will always use this as the root element.
 */
export function ZStyledApplication(props: IZStyledApplication) {
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
