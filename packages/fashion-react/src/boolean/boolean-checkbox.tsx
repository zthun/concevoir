import { ZBooleanCheckboxElement } from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import { ZTrilean, cssJoinDefined, trilean } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { IZBoolean } from './boolean';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-boolean-checkbox']: ZBooleanCheckboxElement & any;
    }
  }
}

export function ZBooleanCheckbox(props: IZBoolean<trilean>) {
  const { className, disabled, label, value, onValueChange, name, fashion, required } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, false);
  const checkbox = useRef<HTMLElement>();

  useMemo(() => includeCustomElement(ZBooleanCheckboxElement), []);

  const handleChange = (e: Event) => {
    const target = e.target as ZBooleanCheckboxElement;
    _setValue(target.value);
  };

  useEffect(() => {
    checkbox.current?.removeEventListener('change', handleChange);
    checkbox.current?.addEventListener('change', handleChange);

    return () => checkbox.current?.removeEventListener('change', handleChange);
  }, [checkbox.current]);

  return (
    <z-boolean-checkbox
      class={cssJoinDefined(className)}
      disabled={!!disabled}
      value={ZTrilean.stringify(_value)}
      fashion={fashion}
      required={required}
      name={name}
      ref={checkbox}
    >
      {label}
    </z-boolean-checkbox>
  );
}
