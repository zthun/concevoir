import { css as _css, keyframes as _keyframes } from "@emotion/css";
import { serializeStyles } from "@emotion/serialize";
import { StyleSheet } from "@emotion/sheet";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { useWindowService } from "@zthun/helpful-react";
import { useCallback, useEffect, useRef } from "react";
import { compile, middleware, rulesheet, serialize, stringify } from "stylis";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "./fashion.mjs";

/**
 * Injects css into the head tag for animations into the document.
 *
 * @param css -
 *        The keyframe css to inject.
 *
 * @returns
 *        The class name for the css.
 */
export function useKeyframes(css: string) {
  return _keyframes(css);
}

/**
 * Injects css into the head tag on the document.
 *
 * @param css -
 *        The css to inject.
 *
 * @returns
 *        The class name for the css.
 */
export function useCss(css: string) {
  return _css(css);
}

/**
 * Adds global css to the head tag on the document.
 *
 * @param css -
 *        The global css to inject.
 */
export function useGlobalCss(css: string) {
  const flush = useRef<() => void>();
  const window = useWindowService();

  // See https://github.com/emotion-js/emotion/issues/2131 for more information about
  // this issue.
  const injectGlobal = useCallback(() => {
    const { name, styles } = serializeStyles(css as any);
    const sheet = new StyleSheet({
      key: `global-${name}`,
      container: window.document.head,
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
