import {
  useFashionTheme,
  ZBox,
  ZButton,
  ZCard,
  ZChoiceSelect,
  ZDrawer,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import {
  setFirst,
  ZHorizontalAnchor,
  ZSideAnchor,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import { identity, startCase } from "lodash-es";
import { useState } from "react";
import { ZFashionRouteDrawer } from "../../routes.mjs";

/**
 * Represents a demo for drawers.
 *
 * @returns The JSX to render the page.
 */
export function ZDrawerPage() {
  const [anchor, setAnchor] = useState<ZSideAnchor>(ZHorizontalAnchor.Left);
  const { primary, success } = useFashionTheme();
  const anchors: ZSideAnchor[] = [
    ZHorizontalAnchor.Left,
    ZHorizontalAnchor.Right,
    ZVerticalAnchor.Top,
    ZVerticalAnchor.Bottom,
  ];
  const [open, setOpen] = useState(false);

  return (
    <ZCard
      className="ZDrawerPage-root"
      TitleProps={{
        heading: ZFashionRouteDrawer.name,
        subHeading: ZFashionRouteDrawer.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteDrawer.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Drawers are a neat way to save real estate on a page. Most users will
          not need to see everything all at once and only need to navigate or
          view specific pieces of data when they need it. Thus, a drawer can
          easily be used to handle this information.
        </ZParagraph>

        <ZParagraph>
          However, be careful. You do not want to hide too much of your
          interface behind a drawer because it begins to turn into mystery meat
          features, where the user will not be able to figure out how to
          navigate your site, or know where specific pieces of information is.
        </ZParagraph>

        <ZButton
          label="Open Drawer"
          onClick={setOpen.bind(null, true)}
          fashion={primary}
          outline={true}
          name="open-drawer"
        />

        <ZDrawer
          open={open}
          anchor={anchor}
          onClose={setOpen.bind(null, false)}
          renderHeader={() => <ZH3 compact>Drawer</ZH3>}
          renderFooter={() => (
            <ZButton
              label="Close Drawer"
              fashion={success}
              onClick={setOpen.bind(null, false)}
              name="close-drawer"
            />
          )}
        >
          <ZParagraph compact>
            You can put whatever you want in a drawer.
          </ZParagraph>
        </ZDrawer>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZChoiceSelect
            value={[anchor]}
            onValueChange={setFirst.bind(
              null,
              setAnchor,
              ZHorizontalAnchor.Left,
            )}
            options={anchors}
            label="Anchor"
            identifier={identity}
            renderOption={startCase}
            indelible
            name="anchor"
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
