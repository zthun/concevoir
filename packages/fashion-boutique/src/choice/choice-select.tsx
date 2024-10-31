import { css } from "@emotion/css";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import {
  createKeyboardActivate,
  useKeyboardActivate,
} from "@zthun/helpful-react";
import { MouseEvent, ReactNode, useRef, useState } from "react";
import { ZChip } from "../chip/chip";
import { ZPopup } from "../dialog/popup";
import { ZIconFontAwesome } from "../icon/icon-font-awesome";
import { ZLabeled } from "../label/labeled";
import { ZList } from "../list/list";
import { ZListItem } from "../list/list-item";
import { ZFlex } from "../stack/flex";
import { ZStack } from "../stack/stack";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { IZChoice, useChoice } from "./choice";

export function ZChoiceSelect<O = any, V = O>(props: IZChoice<O, V>) {
  const { component, primary, transparent, error } = useFashionTheme();
  const tailor = useFashionTailor();
  const { className, label, multiple, required, disabled, indelible, name } =
    props;
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const icon = open ? "chevron-up" : "chevron-down";

  const onToggle = () => setOpen((o) => !o);
  const { tabIndex, onKey } = useKeyboardActivate(onToggle);
  const {
    choices,
    render,
    value,
    lookup,
    toggleValue,
    isValueSelected,
    setValue,
  } = useChoice(props);

  const _className = css`
    &[data-disabled="true"] {
      pointer-events: none;
    }
    &[data-disabled="true"] .ZChoice-values {
      opacity: 0.35;
    }

    .ZChoice-values {
      align-items: center;
      background-color: ${component.idle.main};
      border-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.Medium)};
      color: ${component.idle.contrast};
      cursor: pointer;
      display: flex;
      gap: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      min-height: 2.5rem;
      outline: none;
      padding: calc(${tailor.gap(ZSizeFixed.Small)} / 8)
        ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }

    .ZChoice-toggler {
      display: inline-flex;
    }

    .ZChoice-clear:hover,
    .ZChoice-remove:hover {
      color: ${error.idle.main};
    }

    .ZChoice-value {
      flex-grow: 1;
    }

    &[data-multiple="true"] .ZChoice-value {
      flex-grow: 0;
    }
  `;

  const renderValue = (value: V) => {
    const option = lookup.get(value);
    const key = option == null ? String(value) : option.key;
    const _value = option == null ? value : option.value;
    const element = option == null ? String(value) : render(option.option);

    const handleRemove = (e: MouseEvent) => {
      e.stopPropagation();
      toggleValue(value);
    };

    const remove = (
      <ZIconFontAwesome
        className="ZChoice-remove"
        name="xmark"
        width={ZSizeFixed.ExtraSmall}
        onClick={handleRemove}
      />
    );

    return (
      <ZChip
        key={key}
        className="ZChoice-value"
        fashion={multiple ? primary : transparent}
        data-value={_value}
        suffix={multiple ? remove : null}
      >
        {element}
      </ZChip>
    );
  };

  const renderSelection = (): ReactNode | ReactNode[] => {
    let values = value;

    if (!values.length) {
      return null;
    }

    if (!multiple) {
      values = values.slice(0, 1);
    }

    return (
      <ZStack
        className="ZChoice-value-list"
        orientation={ZOrientation.Horizontal}
        gap={ZSizeFixed.ExtraSmall}
        wrap="wrap"
      >
        {values.map(renderValue)}
      </ZStack>
    );
  };

  const handleSelect = (value: V) => {
    toggleValue(value);

    if (!multiple) {
      setOpen(false);
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    setValue([]);
  };

  return (
    <div
      className={cssJoinDefined(
        "ZChoice-root",
        "ZChoice-select",
        _className,
        className,
      )}
      data-disabled={disabled}
      data-multiple={multiple}
      data-name={name}
    >
      <ZLabeled
        label={label}
        LabelProps={{ required, className: "ZChoice-label" }}
      >
        <div
          className="ZChoice-values"
          onClick={onToggle}
          tabIndex={tabIndex}
          onKeyDown={onKey}
        >
          <ZFlex grow={1}>{renderSelection()}</ZFlex>
          {!indelible && !!value?.length && (
            <ZIconFontAwesome
              className="ZChoice-clear"
              name="xmark"
              width={ZSizeFixed.ExtraSmall}
              onClick={handleClear}
            />
          )}
          <ZIconFontAwesome
            className="ZChoice-toggler"
            name={icon}
            width={ZSizeFixed.ExtraSmall}
          />
        </div>
      </ZLabeled>
      <ZPopup
        className="ZChoice-options-popup"
        attach={input.current}
        compact
        open={open}
        onClose={setOpen.bind(null, false)}
        height={{ xl: ZSizeFixed.ExtraLarge, md: ZSizeFixed.Large }}
        name="choice-popup"
      >
        <ZList compact>
          {choices.map((choice) => (
            <ZListItem
              className="ZChoice-option"
              key={choice.key}
              compact
              cursor="pointer"
              interactive
              highlight={isValueSelected(choice.value)}
              data-value={choice.value}
              onClick={handleSelect.bind(null, choice.value)}
              onKeyDown={createKeyboardActivate(
                handleSelect.bind(null, choice.value),
              )}
            >
              {render(choice.option)}
            </ZListItem>
          ))}
        </ZList>
      </ZPopup>
    </div>
  );
}
