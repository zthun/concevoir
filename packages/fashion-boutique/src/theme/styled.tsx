import { serializeStyles } from "@emotion/serialize";
import { StyleSheet } from "@emotion/sheet";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { useEffect, useRef } from "react";
import { compile, middleware, rulesheet, serialize, stringify } from "stylis";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "./fashion.mjs";

/**
 * Adds global css to the head.
 *
 * @param css -
 *        The global css to inject.
 */
export function useGlobalCss(css: string) {
  const flush = useRef<() => void>();

  useEffect(() => {
    flush.current?.call(null);
    const { name, styles } = serializeStyles(css as any);
    const sheet = new StyleSheet({
      key: `global-${name}`,
      container: document.head,
    });
    const stylis = (styles: any) =>
      serialize(
        compile(styles),
        middleware([
          stringify,
          rulesheet((rule) => {
            sheet.insert(rule);
          }),
        ]),
      );
    stylis(styles);
    flush.current = () => sheet.flush();
    return () => flush.current?.call(null);
  }, [css]);
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

  useGlobalCss(css`
    body {
      background-color: ${body.idle.main};
      color: ${body.idle.contrast};
      margin: 0;
      position: relative;
      height: 100vh;
    }
  `);

  return (
    <div className={cssJoinDefined("ZStyled-root", className)}>{children}</div>
  );
}
