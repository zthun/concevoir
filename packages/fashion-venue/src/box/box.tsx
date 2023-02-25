import { ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-designer';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { get } from 'lodash';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { makeStyles } from '../theme/theme';

export interface IZBox extends IZComponentHierarchy, IZComponentStyle {
  padding?:
    | ZSizeFixed
    | ZSizeVoid
    | {
        x?: ZSizeFixed | ZSizeVoid;
        y?: ZSizeFixed | ZSizeVoid;
      }
    | {
        left?: ZSizeFixed | ZSizeVoid;
        right?: ZSizeFixed | ZSizeVoid;
        top?: ZSizeFixed | ZSizeVoid;
        bottom?: ZSizeFixed | ZSizeVoid;
      };
  margin?:
    | ZSizeFixed
    | ZSizeVaried.Fit
    | ZSizeVoid
    | {
        x?: ZSizeFixed | ZSizeVoid;
        y?: ZSizeFixed | ZSizeVoid;
      }
    | {
        left?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
        right?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
        top?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
        bottom?: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit;
      };
}

const useBoxStyles = makeStyles<IZBox>()((theme, props) => {
  const { padding, margin } = props;

  const asPadding = (pad: ZSizeFixed | ZSizeVoid | object) => {
    const size = typeof pad === 'object' ? ZSizeVoid.None : pad;
    return theme.gap(size);
  };

  const asMargin = (margin: ZSizeFixed | ZSizeVoid | ZSizeVaried.Fit | object) => {
    if (typeof margin === 'object') {
      return theme.gap(ZSizeVoid.None);
    }

    if (margin === ZSizeVaried.Fit) {
      return 'auto';
    }

    return theme.gap(margin);
  };

  const pLeft = firstDefined(ZSizeVoid.None, get(padding, 'left'), get(padding, 'x'), padding);
  const pRight = firstDefined(ZSizeVoid.None, get(padding, 'right'), get(padding, 'x'), padding);
  const pTop = firstDefined(ZSizeVoid.None, get(padding, 'top'), get(padding, 'y'), padding);
  const pBottom = firstDefined(ZSizeVoid.None, get(padding, 'bottom'), get(padding, 'y'), padding);

  const mLeft = firstDefined(ZSizeVoid.None, get(margin, 'left'), get(margin, 'x'), margin);
  const mRight = firstDefined(ZSizeVoid.None, get(margin, 'right'), get(margin, 'x'), margin);
  const mTop = firstDefined(ZSizeVoid.None, get(margin, 'top'), get(margin, 'y'), margin);
  const mBottom = firstDefined(ZSizeVoid.None, get(margin, 'bottom'), get(margin, 'y'), margin);

  return {
    root: {
      paddingLeft: asPadding(pLeft),
      paddingRight: asPadding(pRight),
      paddingTop: asPadding(pTop),
      paddingBottom: asPadding(pBottom),
      marginLeft: asMargin(mLeft),
      marginRight: asMargin(mRight),
      marginTop: asMargin(mTop),
      marginBottom: asMargin(mBottom)
    }
  };
});

/**
 * Just a box.
 *
 * @param props -
 *        The properties for the box
 *
 * @returns
 *        The JSX to render the box.
 */
export function ZBox(props: IZBox) {
  const { className, children } = props;
  const { classes } = useBoxStyles(props);

  const _className = cssJoinDefined('ZBox-root', className, classes.root);
  return <div className={_className}>{children}</div>;
}
