import {
  IZDrawer,
  IZModal,
  ZBooleanSwitch,
  ZBox,
  ZButton,
  ZCard,
  ZChoiceDropDown,
  ZDialogButton,
  ZDrawer,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZModal,
  ZParagraph,
  ZStack
} from '@zthun/fashion-react';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZFashionPriority, ZFashionSeverity } from '@zthun/fashion-theme';
import { ZHorizontalAnchor, ZOrientation, ZSideAnchor, ZVerticalAnchor, setFirst } from '@zthun/helpful-fn';
import { identity, startCase } from 'lodash-es';
import React, { useState } from 'react';
import { ZFashionRouteDialog } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

export function ZDialogPage() {
  const [anchor, setAnchor] = useState<ZSideAnchor>(ZHorizontalAnchor.Left);
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const anchors: ZSideAnchor[] = [
    ZHorizontalAnchor.Left,
    ZHorizontalAnchor.Right,
    ZVerticalAnchor.Top,
    ZVerticalAnchor.Bottom
  ];
  const [fullWidth, setFullWidth] = useState(false);
  const [fullHeight, setFullHeight] = useState(false);
  const [persistent, setPersistent] = useState(false);
  const [, fashion, setFashion] = useFashionState();

  const now = () => setTimestamp(new Date().getTime());

  return (
    <ZCard
      className='ZDialogPage-root'
      heading={ZFashionRouteDialog.name}
      subHeading={ZFashionRouteDialog.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteDialog.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Dialogs are UI elements that pop content out to the user. It's not always necessary to show the user
          everything all at once when they do not need to see specific elements. Dialog elements help with this.
        </ZParagraph>

        <ZParagraph>
          However, be careful. You do not want to hide too much of your interface behind dialogs because it begins to
          turn into mystery meat features, where the user will not be able to figure out how to navigate your site, or
          know where specific pieces of information is.
        </ZParagraph>

        <ZGrid gap={ZSizeFixed.Small} columns={{ xl: '1fr 1fr', xs: '1fr' }}>
          <ZDialogButton
            ButtonProps={{
              fashion: ZFashionPriority.Primary,
              outline: true,
              name: 'open-drawer',
              label: 'Open Drawer',
              avatar: <ZIconFontAwesome name='bars' width={ZSizeFixed.ExtraSmall} />,
              width: ZSizeVaried.Full
            }}
            closeOnChange={[timestamp]}
            renderDialog={(props: IZDrawer) => (
              <ZDrawer
                {...props}
                anchor={anchor}
                fashion={fashion}
                name='drawer'
                persistent={persistent}
                renderHeader={() => <ZH3 compact>Drawer</ZH3>}
                renderFooter={() => (
                  <ZButton label='Close Drawer' fashion={ZFashionSeverity.Success} onClick={now} name='close-drawer' />
                )}
              >
                <ZParagraph>You can put whatever you want in a drawer.</ZParagraph>
              </ZDrawer>
            )}
          />
          <ZDialogButton
            ButtonProps={{
              fashion: ZFashionSeverity.Success,
              outline: true,
              name: 'open-modal',
              label: 'Open Modal',
              avatar: <ZIconFontAwesome name='window-maximize' width={ZSizeFixed.ExtraSmall} />,
              width: ZSizeVaried.Full
            }}
            closeOnChange={[timestamp]}
            renderDialog={(props: IZModal) => (
              <ZModal
                {...props}
                fashion={fashion}
                name='modal'
                persistent={persistent}
                renderHeader={() => <ZH3 compact>Modal</ZH3>}
                renderFooter={() => (
                  <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.ExtraSmall} justifyContent='flex-end'>
                    <ZButton
                      fashion={ZFashionSeverity.Warning}
                      avatar={<ZIconFontAwesome name='close' width={ZSizeFixed.ExtraSmall} />}
                      label='Cancel'
                      onClick={now}
                      name='cancel-modal'
                    />
                    <ZButton
                      fashion={ZFashionSeverity.Success}
                      avatar={<ZIconFontAwesome name='floppy-disk' width={ZSizeFixed.ExtraSmall} />}
                      label='Save'
                      onClick={now}
                      name='save-modal'
                    />
                  </ZStack>
                )}
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
              >
                Modal content is always in the main body. You can put whatever you want in a modal, similar to how you
                can put anything you want in any kind of popup body.
              </ZModal>
            )}
          />
        </ZGrid>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZStack gap={ZSizeFixed.Medium}>
          <ZH3 compact>Dialog Options</ZH3>

          <ZBooleanSwitch value={persistent} onValueChange={setPersistent} label='Persistent' name='persistent' />
          <ZChoiceDropDownFashion value={fashion} onValueChange={setFashion} name='fashion' />

          <ZH3 compact>Drawer Options</ZH3>

          <ZChoiceDropDown
            value={[anchor]}
            onValueChange={setFirst.bind(null, setAnchor, ZHorizontalAnchor.Left)}
            options={anchors}
            label='Anchor'
            identifier={identity}
            renderOption={startCase}
            indelible
            name='anchor'
          />

          <ZH3 compact>Modal Options</ZH3>

          <ZBooleanSwitch value={fullWidth} onValueChange={setFullWidth} label='Full Width' name='full-width' />
          <ZBooleanSwitch value={fullHeight} onValueChange={setFullHeight} label='Full Height' name='full-height' />
        </ZStack>

        <ZH3></ZH3>
      </ZBox>
    </ZCard>
  );
}
