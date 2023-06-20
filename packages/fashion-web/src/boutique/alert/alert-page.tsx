import {
  ZAlert,
  ZBooleanSwitch,
  ZBox,
  ZCard,
  ZGrid,
  ZH3,
  ZH4,
  ZIconFontAwesome,
  ZParagraph
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRouteAlert } from '../../routes';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/useFashionState';

/**
 * Represents a demo for booleans.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZAlertPage() {
  const [heading, setHeading] = useState(true);
  const [avatar, setAvatar] = useState(true);
  const [fashion, fashionName, setFashion] = useFashionState();

  return (
    <ZCard
      className='ZAlertPage-root'
      heading={ZFashionRouteAlert.name}
      subHeading={ZFashionRouteAlert.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteAlert.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Alerts are useful for notifying the user that something has happened. They are colorful boxes that describe
        severity by their look alone.
      </ZParagraph>

      <ZParagraph>
        Alerts are often used as toast messages. Under no circumstances will Zthunworks fashion support toast messages.
        These type of feedback mechanisms discriminate against users that need time to read or process feedback and
        often cause issues with interface layouts.
      </ZParagraph>

      <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
        <ZAlert
          fashion={fashion}
          message='Alerts are great ways to notify users that something has happened.'
          heading={heading && <ZH4 compact>{fashion?.name || 'Alert'}</ZH4>}
          name='checkbox'
          avatar={avatar && <ZIconFontAwesome name='hat-cowboy-side' width={ZSizeFixed.Small} />}
        />
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
        <ZH3>Options</ZH3>

        <ZGrid>
          <ZBooleanSwitch value={heading} onValueChange={setHeading} label='Header' name='header' />
          <ZBooleanSwitch value={avatar} onValueChange={setAvatar} label='Avatar' name='avatar' />
        </ZGrid>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
        <ZChoiceDropDownFashion value={fashionName} onValueChange={setFashion} name='fashion' />
      </ZBox>
    </ZCard>
  );
}
