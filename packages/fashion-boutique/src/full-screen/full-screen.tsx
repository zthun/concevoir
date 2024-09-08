import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { createStyleHook } from "../theme/styled";

const useFullScreenStyles = createStyleHook(({ tailor }) => ({
  screen: {
    padding: tailor.gap(),
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));

export function ZFullScreen(props: IZComponentHierarchy) {
  const { children } = props;
  const { classes } = useFullScreenStyles();

  return <div className={classes.screen}>{children}</div>;
}
