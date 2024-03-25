import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { ZQuadrilateralBuilder } from '@zthun/helpful-fn';
import React from 'react';
import { ZBanner } from '../banner/banner';
import { ZBox } from '../box/box';
import { IZComponentAdornment } from '../component/component-adornment.mjs';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { ZGrid } from '../grid/grid';
import { ZStyled } from '../theme/styled';

export interface IZBannerMain extends IZComponentHierarchy, IZComponentAvatar, IZComponentAdornment {}

export function ZBannerMain(props: IZBannerMain) {
  const { children, avatar, prefix = <span />, suffix = <span /> } = props;

  return (
    <ZStyled className='ZBannerMain-root'>
      <ZBanner className='ZBannerMain-header' fashion={ZFashionPriority.Primary}>
        <ZBox padding={new ZQuadrilateralBuilder(ZSizeFixed.ExtraSmall).y(ZSizeFixed.Medium).build()}>
          <ZGrid columns='auto auto 1fr auto' align={{ items: 'center' }} gap={ZSizeFixed.Small}>
            <div className='ZBannerMain-avatar'>{avatar}</div>
            <div className='ZBannerMain-prefix'>{prefix}</div>
            <span />
            <div className='ZBannerMain-suffix'>{suffix}</div>
          </ZGrid>
        </ZBox>
      </ZBanner>
      <ZBox padding={new ZQuadrilateralBuilder(ZSizeFixed.Large).build()}>
        <main className='ZBannerMain-content'>{children}</main>
      </ZBox>
    </ZStyled>
  );
}
