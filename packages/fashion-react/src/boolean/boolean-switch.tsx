import { cssJoinDefined, firstTruthy } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import React, { useEffect, useRef } from "react";
import { IZBoolean } from "./boolean";

import { ZBooleanSwitchElement } from "@zthun/fashion-boutique";
import { useWebComponent } from "../component/use-web-component.mjs";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-boolean-switch"]: ZBooleanSwitchElement & any;
    }
  }
}

export function ZBooleanSwitch(props: IZBoolean<boolean>) {
  const {
    className,
    disabled,
    label,
    value,
    onValueChange,
    name,
    fashion,
    required,
  } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, false);
  const checkbox = useRef<HTMLElement>();
  useWebComponent(ZBooleanSwitchElement);

  const handleChange = (e: Event) => {
    const target = e.target as ZBooleanSwitchElement;
    _setValue(!!target.value);
  };

  useEffect(() => {
    checkbox.current?.removeEventListener("change", handleChange);
    checkbox.current?.addEventListener("change", handleChange);

    return () => checkbox.current?.removeEventListener("change", handleChange);
  }, [checkbox.current]);

  return (
    <z-boolean-switch
      class={cssJoinDefined(className)}
      disabled={firstTruthy(undefined, disabled)}
      value={String(_value)}
      fashion={fashion}
      required={firstTruthy(undefined, required)}
      name={name}
      ref={checkbox}
    >
      {label}
    </z-boolean-switch>
  );
}
