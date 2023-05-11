import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZIcon, useIconProvider, useIconStyles } from './icon';

export const ZIconMaterialProvider = 'https://fonts.googleapis.com/icon?family=Material+Icons';
export const ZIconMaterialVendor = 'material';

export function ZIconMaterial(props: IZIcon) {
  const { name, className } = props;
  const { classes } = useIconStyles(props);
  useIconProvider(ZIconMaterialProvider);

  return (
    <span
      className={cssJoinDefined('ZIcon-root', 'ZIcon-material', 'material-icons', className, classes.root)}
      data-name={name}
      data-vendor={ZIconMaterialVendor}
    >
      {name}
    </span>
  );
}
