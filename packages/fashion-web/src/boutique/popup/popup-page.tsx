import { ZCard, ZH3, ZIconFontAwesome, ZParagraph, ZPopupButton } from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionSeverity } from '@zthun/fashion-theme';
import React, { useMemo } from 'react';
import { ZFashionRoutePopup } from '../../routes.mjs';

export function ZPopupPage() {
  const PopupButtonProps = useMemo(() => ({ fashion: ZFashionSeverity.Success, label: 'Open' }), []);

  return (
    <ZCard
      className='ZPopupPage-root'
      heading={ZFashionRoutePopup.name}
      subHeading={ZFashionRoutePopup.description}
      avatar={<ZIconFontAwesome name={ZFashionRoutePopup.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Popups are similar to drawers in that they let you extend the content to the user without having to show
        everything all at once. While some components, such as the Choice and Drawer, come with their own internal popup
        mechanism, the popup component lets you put anything you want in a popup and gives you an API to display that
        content whenever certain conditions are met.
      </ZParagraph>

      <ZPopupButton ButtonProps={PopupButtonProps}>You can put anything you want in popup content.</ZPopupButton>
    </ZCard>
  );
}
