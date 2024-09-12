import {
  ZButton,
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZPopup,
  useFashionTheme,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { MouseEvent, useState } from "react";
import { ZFashionRoutePopup } from "../../routes.mjs";

export function ZPopupPage() {
  const { primary, success } = useFashionTheme();
  const [open, setOpen] = useState(false);
  const [attach, setAttach] = useState<HTMLElement>();

  const openPopup = (e: MouseEvent<HTMLElement>) => {
    setAttach(e.currentTarget);
    setOpen(true);
  };

  return (
    <ZCard
      className="ZPopupPage-root"
      heading={ZFashionRoutePopup.name}
      subHeading={ZFashionRoutePopup.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRoutePopup.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Popups are similar to drawers in that they let you extend the content to
        the user without having to show everything all at once. While some
        components, such as the Choice and Drawer, come with their own internal
        popup mechanism, the popup component lets you put anything you want in a
        popup and gives you an API to display that content whenever certain
        conditions are met.
      </ZParagraph>

      <ZButton
        fashion={success}
        outline
        label="Open Popup"
        onClick={openPopup}
        width={ZSizeVaried.Full}
        name="open-popup"
      />

      <ZPopup
        attach={attach}
        onClose={setOpen.bind(null, false)}
        open={open}
        renderHeader={() => <ZH3 compact>Popup</ZH3>}
        renderFooter={() => (
          <ZButton
            name="close-popup"
            label="Close Popup"
            onClick={setOpen.bind(null, false)}
            fashion={primary}
          />
        )}
      >
        <ZParagraph compact>
          You can put anything you want in popup content.
        </ZParagraph>
      </ZPopup>
    </ZCard>
  );
}
