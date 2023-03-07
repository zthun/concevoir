import { ZSizeFixed } from '@zthun/fashion-chroma';
import {
  IZComponentAdornment,
  IZComponentAvatar,
  IZComponentHierarchy,
  useFashionTheme,
  ZBanner,
  ZBox,
  ZGrid,
  ZStyled
} from '@zthun/fashion-venue';
import React from 'react';

export interface IZBannerMain extends IZComponentHierarchy, IZComponentAvatar, IZComponentAdornment {}

/**
 * Represents a layout that uses a banner with main content.
 */
export function ZBannerMain(props: IZBannerMain) {
  const { children, avatar, prefix = <span />, suffix = <span /> } = props;
  const theme = useFashionTheme();
  const { primary } = theme.design();

  return (
    <ZStyled className='ZBannerMain-root'>
      <ZBanner className='ZBannerMain-header' position='sticky' fashion={primary}>
        <ZBox padding={{ x: ZSizeFixed.Medium, y: ZSizeFixed.ExtraSmall }}>
          <ZGrid columns='auto auto 1fr auto' alignItems='center' gap={ZSizeFixed.Small}>
            <div className='ZBannerMain-avatar'>{avatar}</div>
            <div className='ZBannerMain-prefix'>{prefix}</div>
            <span />
            <div className='ZBannerMain-suffix'>{suffix}</div>
          </ZGrid>
        </ZBox>
      </ZBanner>
      <ZBox padding={ZSizeFixed.Large}>
        <main className='ZBannerMain-content'>{children}</main>
      </ZBox>
    </ZStyled>
  );
}
