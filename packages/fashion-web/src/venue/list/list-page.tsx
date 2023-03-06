import { ZSizeFixed } from '@zthun/fashion-designer';
import {
  useFashionTheme,
  ZBox,
  ZCaption,
  ZCard,
  ZH3,
  ZImageSource,
  ZList,
  ZListDivider,
  ZListGroup,
  ZListLineItem,
  ZParagraph
} from '@zthun/fashion-venue';
import React, { useState } from 'react';
import { ZFashionRouteVenueList } from '../../routes';

/**
 * Represents a demo for lists.
 *
 * @returns
 *    The JSX to render the list demo page.
 */
export function ZListPage() {
  const theme = useFashionTheme();
  const { light } = theme.design();
  const [count, setCount] = useState(0);

  const prefix = <ZImageSource src='/images/svg/hero.svg' height={ZSizeFixed.Small} />;
  const suffix = <ZImageSource src='/images/svg/search.svg' height={ZSizeFixed.Small} />;

  const incrementCount = () => setCount((c) => c + 1);

  return (
    <ZCard
      className='ZListPage-root'
      heading={ZFashionRouteVenueList.name}
      subHeading={ZFashionRouteVenueList.description}
      avatar={<ZImageSource src={ZFashionRouteVenueList.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Lists help with displaying arrays and collections of data. You can think of a list component as an unordered
          list (&lt;ul&gt;) in html. The most basic kind of list item comes in the form of a line item. A line item is a
          basic 0-1-0 flex container that shows an avatar, a text header with a sub header, and an end adornment.
        </ZParagraph>

        <ZParagraph>
          Line items can be clickable or readonly and this can be toggled by simply setting or not setting the onClick
          event to a truthy or falsy value respectively.
        </ZParagraph>

        <ZBox border={{ fashion: light.dark }} background={{ fashion: light }} width={ZSizeFixed.Medium}>
          <ZList>
            <ZListGroup heading='Without Click Support' />
            <ZListLineItem prefix={prefix} name='avatar-and-text' heading='Prefix and Text (No Click)' />
            <ZListLineItem
              prefix={prefix}
              name='avatar-text-and-adornment'
              heading='Prefix, Text, and Suffix (No Click)'
              suffix={suffix}
            />
            <ZListDivider />
            <ZListGroup heading='With Click Support'></ZListGroup>
            <ZListLineItem
              prefix={prefix}
              suffix={suffix}
              name='everything'
              heading='Line Item Everything'
              subHeading='Line item with header, sub header, prefix, and suffix'
              onClick={incrementCount}
            />
            <ZListLineItem
              name='text-only'
              heading='Text only line item'
              subHeading='Line item with just text'
              onClick={incrementCount}
            />
          </ZList>
        </ZBox>

        <ZBox margin={{ top: ZSizeFixed.Medium }}>
          <ZCaption>
            Click Count: <span className='ZListPage-click-count'>{count}</span>
          </ZCaption>
        </ZBox>
      </ZBox>
    </ZCard>
  );
}
