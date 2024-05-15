import {
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZModal,
  ZParagraph,
  ZStack
} from '@zthun/fashion-react';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZFashionSeverity } from '@zthun/fashion-theme';
import { ZOrientation } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZFashionRouteModal } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

export function ZModalPage() {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [fullHeight, setFullHeight] = useState(false);
  const [persistent, setPersistent] = useState(false);
  const [, fashion, setFashion] = useFashionState();

  const renderHeader = () => <ZH3 compact>Modal Header</ZH3>;

  const renderFooter = () => (
    <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.ExtraSmall} justifyContent='flex-end'>
      <ZButton
        fashion={ZFashionSeverity.Warning}
        avatar={<ZIconFontAwesome name='close' width={ZSizeFixed.ExtraSmall} />}
        label='Cancel'
        onClick={setOpen.bind(null, false)}
        name='cancel'
      />
      <ZButton
        fashion={ZFashionSeverity.Success}
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
          Dialogs are for getting work done. These let you do specific isolated work without having to show all the
          information on the main screen.
        </ZParagraph>

        <ZButton
          fashion={ZFashionSeverity.Success}
          label='Open Dialog'
          avatar={<ZIconFontAwesome name='comment-dots' width={ZSizeFixed.ExtraSmall} />}
          onClick={setOpen.bind(null, true)}
          name='open-modal'
        />

        <ZModal
          open={open}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
          onClose={setOpen.bind(null, false)}
          persistent={persistent}
          width={{
            xl: fullWidth ? ZSizeVaried.Full : ZSizeFixed.ExtraLarge,
            lg: fullWidth ? ZSizeVaried.Full : ZSizeFixed.Large,
            md: fullWidth ? ZSizeVaried.Full : ZSizeFixed.Medium,
            sm: fullWidth ? ZSizeVaried.Full : ZSizeFixed.Small,
            xs: fullWidth ? ZSizeVaried.Full : ZSizeFixed.ExtraSmall
          }}
          height={{
            xl: fullHeight ? ZSizeVaried.Full : ZSizeFixed.ExtraLarge,
            lg: fullHeight ? ZSizeVaried.Full : ZSizeFixed.Large,
            md: fullHeight ? ZSizeVaried.Full : ZSizeFixed.Medium,
            sm: fullHeight ? ZSizeVaried.Full : ZSizeFixed.Small,
            xs: fullHeight ? ZSizeVaried.Full : ZSizeFixed.ExtraSmall
          }}
          fashion={fashion}
          name='modal'
        >
          Modal content is always in the main body. You can put whatever you want in a modal, similar to how you can put
          anything you want in any kind of popup body.
        </ZModal>
      </ZBox>

      <ZH3>Options</ZH3>

      <ZBox margin={{ bottom: ZSizeFixed.Small }}>
        <ZStack gap={ZSizeFixed.ExtraSmall} alignItems='start'>
          <ZBooleanSwitch value={fullWidth} onValueChange={setFullWidth} label='Full Width' name='full-width' />
          <ZBooleanSwitch value={fullHeight} onValueChange={setFullHeight} label='Full Height' name='full-height' />
          <ZBooleanSwitch value={persistent} onValueChange={setPersistent} label='Persistent' name='persistent' />
        </ZStack>
      </ZBox>

      <ZStack gap={ZSizeFixed.ExtraSmall}>
        <ZChoiceDropDownFashion value={fashion} onValueChange={setFashion} name='fashion' />
      </ZStack>
    </ZCard>
  );
}
