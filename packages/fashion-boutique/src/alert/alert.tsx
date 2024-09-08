import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { cssJoinDefined } from "@zthun/helpful-fn";
import { ReactNode } from "react";
import { IZComponentAvatar } from "../component/component-avatar.mjs";
import { IZComponentFashion } from "../component/component-fashion.mjs";
import { IZComponentHeading } from "../component/component-heading.mjs";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";

export interface IZAlert
  extends Omit<IZComponentHeading, "subHeading">,
    IZComponentName,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentAvatar {
  message?: ReactNode;
}

const useAlertStyles = (props: IZAlert) => {
  const theme = useFashionTheme();
  const tailor = useFashionTailor();
  const { primary } = theme;
  const { fashion = primary } = props;
  const picker = new ZColorPicker(fashion);

  const boxWidth = tailor.thickness(ZSizeFixed.ExtraSmall);
  const px = tailor.gap(ZSizeFixed.Small);
  const py = tailor.gap(ZSizeFixed.ExtraSmall);

  return css`
    &.ZAlert-root {
      align-items: center;
      background: ${picker.idle.main};
      border-color: ${picker.idle.border};
      border-radius: 0.25rem;
      border-style: double;
      box-shadow: 0 0 0 ${boxWidth} ${picker.idle.border};
      color: ${picker.idle.contrast};
      display: grid;
      grid-template-columns: auto auto 1fr;
      grid-template-areas:
        "avatar heading    ."
        "avatar subheading ."
        "avatar message    ."
        "avatar footing    .";
      padding: ${px} ${py};
    }

    .ZAlert-avatar {
      grid-area: avatar;
      margin-right: ${tailor.gap(ZSizeFixed.Medium)};
    }

    .ZAlert-heading {
      grid-area: heading;
      margin-bottom: ${tailor.gap(ZSizeFixed.Small)};
    }

    .ZAlert-message {
      grid-area: message;
    }

    .ZAlert-footing {
      grid-area: footing;
      margin-top: ${tailor.gap(ZSizeFixed.Small)};
    }
  `;
};

export function ZAlert(props: IZAlert) {
  const { primary } = useFashionTheme();
  const {
    heading,
    name,
    className,
    avatar,
    message,
    fashion = primary,
  } = props;

  const _className = useAlertStyles(props);

  return (
    <div
      className={cssJoinDefined("ZAlert-root", className, _className)}
      data-name={name}
      data-fashion={fashion.name}
    >
      {avatar && <div className="ZAlert-avatar">{avatar}</div>}
      {heading && <div className="ZAlert-heading">{heading}</div>}
      <div className={"ZAlert-message"}>{message}</div>
    </div>
  );
}
