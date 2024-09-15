import {
  useFashionTheme,
  ZBox,
  ZCaption,
  ZCard,
  ZContentTitle,
  ZDivider,
  ZH3,
  ZH4,
  ZH6,
  ZIconFontAwesome,
  ZList,
  ZListItem,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { useState } from "react";
import { ZFashionRouteList } from "../../routes.mjs";

/**
 * Represents a demo for lists.
 *
 * @returns
 *    The JSX to render the list demo page.
 */
export function ZListPage() {
  const { body } = useFashionTheme();
  const [count, setCount] = useState(0);

  const suffix = (
    <ZIconFontAwesome name="magnifying-glass" width={ZSizeFixed.Small} />
  );

  const incrementCount = () => {
    setCount((c) => c + 1);
  };

  return (
    <ZCard
      className="ZListPage-root"
      TitleProps={{
        heading: ZFashionRouteList.name,
        subHeading: ZFashionRouteList.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteList.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Lists help with displaying arrays and collections of data. You can
          think of a list component as an unordered list (&lt;ul&gt;) in html.
        </ZParagraph>

        <ZBox fashion={body} border={{ width: ZSizeFixed.ExtraSmall }}>
          <ZList>
            <ZListItem compact>
              <ZH6>Alpha - Charlie</ZH6>
            </ZListItem>
            <ZListItem
              cursor="pointer"
              name="alpha"
              interactive
              onClick={incrementCount}
            >
              <ZContentTitle
                heading={<ZH4 compact>Alpha</ZH4>}
                subHeading={<ZCaption compact>The first of a series</ZCaption>}
                suffix={suffix}
              />
            </ZListItem>
            <ZListItem name="beta">
              <ZContentTitle
                heading={<ZH4 compact>Beta</ZH4>}
                subHeading={<ZCaption compact>The second of a series</ZCaption>}
              />
            </ZListItem>
            <ZListItem name="charlie">
              <ZContentTitle
                heading={<ZH4 compact>Charlie</ZH4>}
                subHeading={
                  <ZCaption compact>He inherited a chocolate factory</ZCaption>
                }
              />
            </ZListItem>
            <ZListItem compact>
              <ZDivider compact />
            </ZListItem>
            <ZListItem compact>
              <ZH6>Delta - Foxtrot</ZH6>
            </ZListItem>
            <ZListItem
              cursor="pointer"
              name="delta"
              interactive
              onClick={incrementCount}
            >
              <ZContentTitle
                heading={<ZH4 compact>Delta</ZH4>}
                subHeading={
                  <ZCaption compact>A finite increment in a variable</ZCaption>
                }
                suffix={suffix}
              />
            </ZListItem>
            <ZListItem
              cursor="pointer"
              name="echo"
              interactive
              onClick={incrementCount}
            >
              <ZContentTitle
                heading={<ZH4 compact>Echo</ZH4>}
                subHeading={<ZCaption compact>Repetition of a sound</ZCaption>}
                suffix={suffix}
              />
            </ZListItem>
            <ZListItem
              cursor="pointer"
              name="foxtrot"
              interactive
              onClick={incrementCount}
            >
              <ZContentTitle
                heading={<ZH4 compact>Foxtrot</ZH4>}
                subHeading={<ZCaption compact>A ballroom dance</ZCaption>}
                suffix={suffix}
              />
            </ZListItem>
          </ZList>
        </ZBox>

        <ZBox margin={{ top: ZSizeFixed.Medium }}>
          <ZCaption>
            Click Count: <span className="ZListPage-click-count">{count}</span>
          </ZCaption>
        </ZBox>
      </ZBox>
    </ZCard>
  );
}
