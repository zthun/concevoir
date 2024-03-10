import { cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { IZBoolean } from './boolean';

import { ZBooleanSwitchElement } from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-boolean-switch']: ZBooleanSwitchElement & any;
    }
  }
}

export function ZBooleanSwitch(props: IZBoolean<boolean>) {
  const { className, disabled, label, value = false, onValueChange, name, fashion, required } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, false);
  const checkbox = useRef<HTMLElement>();

  useMemo(() => includeCustomElement(ZBooleanSwitchElement), []);

  const handleChange = (e: Event) => {
    const target = e.target as ZBooleanSwitchElement;
    _setValue(!!target.value);
  };

  useEffect(() => {
    checkbox.current?.removeEventListener('change', handleChange);
    checkbox.current?.addEventListener('change', handleChange);

    return () => checkbox.current?.removeEventListener('change', handleChange);
  }, [checkbox.current]);

  return (
    <z-boolean-switch
      class={cssJoinDefined(className)}
      disabled={!!disabled}
      value={String(_value)}
      fashion={fashion}
      required={required}
      name={name}
      ref={checkbox}
    >
      {label}
    </z-boolean-switch>
  );
}
