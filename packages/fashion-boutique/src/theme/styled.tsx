import { injectGlobal } from "@emotion/css";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { useEffect } from "react";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "./fashion.mjs";

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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = injectGlobal`
    body {
      background-color: ${body.idle.main};
      color: ${body.idle.contrast};
      margin: 0;
      position: relative;
      height: 100vh;
    }`;
  }, []);

  return (
    <div className={cssJoinDefined("ZStyled-root", className)}>{children}</div>
  );
}
