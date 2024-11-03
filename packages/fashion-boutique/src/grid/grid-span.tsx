import { ZDeviceValue, ZDeviceValues, ZSizeFixed } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { Property } from "csstype";
import { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionDevice } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled";

export interface IZGridSpan extends IZComponentHierarchy, IZComponentStyle {
  columnStart?: ZDeviceValue<Property.GridColumnStart>;
  columnEnd?: ZDeviceValue<Property.GridColumnEnd>;
  rowStart?: ZDeviceValue<Property.GridRowStart>;
  rowEnd?: ZDeviceValue<Property.GridRowEnd>;
}

export function ZGridSpan(props: IZGridSpan) {
  const device = useFashionDevice();

  const { className, children } = props;
  const { columnStart, columnEnd, rowStart, rowEnd } = props;

  const _columnStart = new ZDeviceValues(columnStart, undefined);
  const _columnEnd = new ZDeviceValues(columnEnd, undefined);
  const _rowStart = new ZDeviceValues(rowStart, undefined);
  const _rowEnd = new ZDeviceValues(rowEnd, undefined);

  const _className = useCss(css`
    &.ZGridSpan-root {
      grid-column-start: ${_columnStart.xl};
      grid-column-end: ${_columnEnd.xl};
      grid-row-start: ${_rowStart.xl};
      grid-row-end: ${_rowEnd.xl};
    }

    ${device.break(ZSizeFixed.Large)} {
      &.ZGridSpan-root {
        grid-column-start: ${_columnStart.lg};
        grid-column-end: ${_columnEnd.lg};
        grid-row-start: ${_rowStart.lg};
        grid-row-end: ${_rowEnd.lg};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      &.ZGridSpan-root {
        grid-column-start: ${_columnStart.md};
        grid-column-end: ${_columnEnd.md};
        grid-row-start: ${_rowStart.md};
        grid-row-end: ${_rowEnd.md};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      &.ZGridSpan-root {
        grid-column-start: ${_columnStart.sm};
        grid-column-end: ${_columnEnd.sm};
        grid-row-start: ${_rowStart.sm};
        grid-row-end: ${_rowEnd.sm};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      &.ZGridSpan-root {
        grid-column-start: ${_columnStart.xs};
        grid-column-end: ${_columnEnd.xs};
        grid-row-start: ${_rowStart.xs};
        grid-row-end: ${_rowEnd.xs};
      }
    }
  `);

  return (
    <div className={cssJoinDefined("ZGridSpan-root", className, _className)}>
      {children}
    </div>
  );
}
