import { cssJoinDefined } from "@zthun/helpful-fn";
import { IZComponentStyle } from "../component/component-style.mjs";

export interface IZDivider extends IZComponentStyle {}

export function ZDivider(props: IZDivider) {
  const { className } = props;

  return (
    <hr
      className={cssJoinDefined("ZDivider-root", className)}
      style={{ color: "inherit" }}
    />
  );
}
