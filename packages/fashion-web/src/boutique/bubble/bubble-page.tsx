import {
  ZBooleanSwitch,
  ZBox,
  ZBubble,
  ZCard,
  ZChoiceDropDown,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-react";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";
import { useStateAsArray } from "@zthun/helpful-react";
import { Property } from "csstype";
import { first, identity, startCase } from "lodash-es";
import React, { useMemo, useState } from "react";
import { ZFashionRouteBubble } from "../../routes.mjs";
import { ZChoiceDropDownFashion } from "../common/choice-drop-down-fashion";
import { ZChoiceDropDownSize } from "../common/choice-drop-down-size";
import { useFashionState } from "../common/use-fashion-state.mjs";

export function ZBubblePage() {
  const [edge, setEdge] = useState<ZSizeFixed | undefined>(undefined);
  const [trim, setTrim] = useStateAsArray<Property.BorderStyle>();
  const [, fashionName, setFashion] = useFashionState();
  const [count, setCount] = useState<number>(0);
  const [clickable, setClickable] = useState(true);
  const sizes = Object.values(ZSizeFixed);
  const trims = useMemo<Property.BorderStyle[]>(
    () => ["solid", "dashed", "dotted", "double"],
    [],
  );

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return (
    <ZCard
      className="ZBubblePage-root"
      heading={ZFashionRouteBubble.name}
      subHeading={ZFashionRouteBubble.description}
      avatar={
        <ZIconFontAwesome
          name={ZFashionRouteBubble.avatar}
          width={ZSizeFixed.Medium}
        />
      }
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Bubbles put things in circles. This is useful for things like avatars
          and icons. You can use bubbles similar to that of a button with click
          events if you choose to.
        </ZParagraph>

        <ZStack
          orientation={ZOrientation.Horizontal}
          gap={ZSizeFixed.ExtraSmall}
          alignItems="center"
        >
          <ZBubble
            edge={edge}
            trim={first(trim)}
            onClick={clickable ? handleClick : undefined}
            name="button"
            fashion={fashionName}
            width={ZSizeFixed.Large}
            padding={ZSizeFixed.Medium}
          >
            <ZIconFontAwesome name="floppy-disk" width={ZSizeFixed.Large} />
          </ZBubble>
        </ZStack>

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <span>Click Count: </span>
          <span className="ZBubblePage-click-count">{count}</span>
        </ZBox>
      </ZBox>

      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>
        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch
            value={clickable}
            onValueChange={setClickable}
            name="clickable"
            label="Clickable"
          />
          <ZChoiceDropDownSize
            value={edge}
            onValueChange={setEdge}
            sizes={sizes}
            name="edge"
            label="Edge"
          />
          <ZChoiceDropDown
            value={trim}
            options={trims}
            name="trim"
            label="Trim"
            identifier={identity}
            renderOption={startCase}
            onValueChange={setTrim}
          />
          <ZChoiceDropDownFashion
            value={fashionName}
            onValueChange={setFashion}
            name="fashion"
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
