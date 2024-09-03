import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { cssJoinDefined } from "@zthun/helpful-fn";
import React from "react";
import { IZComponentAdornment } from "../component/component-adornment.mjs";
import { IZComponentDisabled } from "../component/component-disabled.mjs";
import { IZComponentHeading } from "../component/component-heading.mjs";
import { createStyleHook } from "../theme/styled";
import { IZListItem } from "./list-item.mjs";

/**
 * The props for the line item list.
 */
export interface IZListLineItem
  extends IZListItem,
    IZComponentHeading,
    IZComponentAdornment,
    IZComponentDisabled {
  /**
   * Occurs when the line item is clicked.
   */
  onClick?: () => any;
}

const useListLineItemStyles = createStyleHook(
  ({ tailor }, props: IZListLineItem) => {
    const gap = props.onClick ? 0 : tailor.gap();

    return {
      avatar: {
        marginLeft: gap,
        marginRight: tailor.gap(),
        minWidth: 0,
      },

      text: {
        ".MuiListItemText-secondary": {
          color: "inherit",
          opacity: 0.75,
          fontSize: "0.85em",
        },
      },
    };
  },
);

/**
 * Represents a clickable line item with support for a given header, description, and adornment.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this item.
 */
export function ZListLineItem(props: IZListLineItem) {
  const { className, prefix, heading, name, subHeading, suffix, onClick } =
    props;
  const { classes } = useListLineItemStyles(props);

  const renderContents = () => (
    <>
      <ListItemAvatar
        className={cssJoinDefined("ZListLineItem-avatar", classes.avatar)}
      >
        {prefix}
      </ListItemAvatar>
      <ListItemText
        className={cssJoinDefined("ZListLineItem-text", classes.text)}
        primary={heading}
        secondary={subHeading}
      />
    </>
  );

  const renderClickableContents = () => (
    <ListItemButton className="ZListLineItem-button" onClick={onClick}>
      {renderContents()}
    </ListItemButton>
  );

  return (
    <ListItem
      className={cssJoinDefined(
        "ZListItem-root",
        "ZListLineItem-root",
        className,
      )}
      secondaryAction={suffix}
      data-name={name}
    >
      {onClick ? renderClickableContents() : renderContents()}
    </ListItem>
  );
}
