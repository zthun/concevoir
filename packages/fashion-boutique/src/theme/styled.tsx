import { serializeStyles } from "@emotion/serialize";
import { StyleSheet } from "@emotion/sheet";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { useCallback, useEffect, useRef } from "react";
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

  // See https://github.com/emotion-js/emotion/issues/2131 for more information about
  // this issue.
  const injectGlobal = useCallback(() => {
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

    return () => sheet.flush();
  }, [css]);

  useEffect(() => {
    flush.current?.call(null);
    flush.current = injectGlobal();

    return () => flush.current?.call(null);
  }, [injectGlobal]);
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
