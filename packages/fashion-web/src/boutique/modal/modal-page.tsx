import {
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCard,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZModal,
  ZParagraph,
  ZStack,
  useFashionTheme
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZOrientation } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZFashionRouteModal } from '../../routes';

/**
 * Represents a demo for lists.
 *
 * @returns
 *    The JSX to render the list demo page.
 */
export function ZModalPage() {
  const [open, setOpen] = useState(false);
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const { success, warning } = useFashionTheme();

  const renderHeader = () => 'Modal Header';

  const renderFooter = () => (
    <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.ExtraSmall}>
      <ZButton
        fashion={warning}
        avatar={<ZIconFontAwesome name='close' width={ZSizeFixed.ExtraSmall} />}
        label='Cancel'
        onClick={setOpen.bind(null, false)}
        name='cancel'
      />
      <ZButton
        fashion={success}
        avatar={<ZIconFontAwesome name='floppy-disk' width={ZSizeFixed.ExtraSmall} />}
        label='Save'
        onClick={setOpen.bind(null, false)}
        name='save'
      />
    </ZStack>
  );

  return (
    <ZCard
      className='ZModalPage-root'
      heading={ZFashionRouteModal.name}
      subHeading={ZFashionRouteModal.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteModal.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Modals are for getting work done. These let you do specific isolated work without having to show all the
          information on the main screen.
        </ZParagraph>

        <ZButton
          fashion={success}
          label='Open Modal'
          avatar={<ZIconFontAwesome name='comment-dots' width={ZSizeFixed.ExtraSmall} />}
          onClick={setOpen.bind(null, true)}
          name='open-modal'
        />

        <ZModal
          open={open}
          renderHeader={header ? renderHeader : undefined}
          renderFooter={footer ? renderFooter : undefined}
          onClose={setOpen.bind(null, false)}
          width={fullScreen ? ZSizeVaried.Full : ZSizeVaried.Fit}
          name='modal'
        >
          Modal content is always in the main body. You can put whatever you want in a modal, similar to how you can put
          anything you want in any kind of popup body.
        </ZModal>
      </ZBox>

      <ZH3>Options</ZH3>

      <ZGrid columns='1fr'>
        <ZBooleanSwitch value={header} onValueChange={setHeader} label='Header' name='header' />
        <ZBooleanSwitch value={footer} onValueChange={setFooter} label='Footer' name='footer' />
        <ZBooleanSwitch value={fullScreen} onValueChange={setFullScreen} label='Full Screen' name='full-screen' />
      </ZGrid>
    </ZCard>
  );
}
