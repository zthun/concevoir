import { ZSizeFixed } from '@zthun/fashion-designer';
import {
  IZComponentAdornment,
  IZComponentAvatar,
  IZComponentHierarchy,
  useFashionTheme,
  ZBanner,
  ZBox,
  ZGrid,
  ZStyledApplication
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
    <ZStyledApplication className='ZHeaderMainApp-root'>
      <ZBanner className='ZHeaderMainApp-header' position='sticky' fashion={primary}>
        <ZBox padding={{ x: ZSizeFixed.Medium, y: ZSizeFixed.ExtraSmall }}>
          <ZGrid columns='auto auto 1fr auto' alignItems='center' gap={ZSizeFixed.Small}>
            <div className='ZHeaderMainApp-avatar'>{avatar}</div>
            <div className='ZHeaderMainApp-prefix'>{prefix}</div>
            <span />
            <div className='ZHeaderMainApp-suffix'>{suffix}</div>
          </ZGrid>
        </ZBox>
      </ZBanner>
      <ZBox padding={ZSizeFixed.Large}>
        <main className='ZHeaderMainApp-content'>{children}</main>
      </ZBox>
    </ZStyledApplication>
  );
}
