import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { makeStyles } from '../theme/theme';

const useFullScreenStyles = makeStyles()((theme) => ({
  screen: {
    padding: theme.gap(),
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
}));

export function ZFullScreen(props: IZComponentHierarchy) {
  const { children } = props;
  const { classes } = useFullScreenStyles();

  return <div className={classes.screen}>{children}</div>;
}
