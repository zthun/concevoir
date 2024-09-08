import { Drawer } from "@mui/material";
import { ZSideAnchor, cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { createStyleHook } from "../theme/styled";

/**
 * Represents props for the drawer.
 */
export interface IZDrawer extends IZComponentHierarchy, IZComponentStyle {
  anchor?: ZSideAnchor;
  open: boolean;

  onClose?(): void;
}

const useDrawerStyles = createStyleHook(({ theme }) => {
  const { surface } = theme;

  return {
    root: {
      ".MuiDrawer-paper": {
        backgroundColor: surface.idle.main,
        color: surface.idle.contrast,
      },
    },
  };
});

/**
 * Represents a collapsible drawer.
 *
 * @param props -
 *        The properties for this drawer.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZDrawer(props: IZDrawer) {
  const { className, children, anchor, open, onClose } = props;
  const { classes } = useDrawerStyles();

  return (
    <Drawer
      className={cssJoinDefined("ZDrawer-root", className, classes.root)}
      anchor={anchor}
      open={open}
      onClose={onClose}
      data-anchor={anchor}
    >
      {children}
    </Drawer>
  );
}
