import { ZBooleanCheckboxElement } from '@zthun/fashion-boutique';
import { cssJoinDefined, firstTruthy } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import { ZTrilean, trilean } from '@zthun/trilean';
import React, { useEffect, useRef } from 'react';
import { useWebComponent } from '../component/use-web-component.mjs';
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
  useWebComponent(ZBooleanCheckboxElement);

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
      disabled={firstTruthy(undefined, disabled)}
      value={ZTrilean.stringify(_value)}
      fashion={fashion}
      required={firstTruthy(undefined, required)}
      name={name}
      ref={checkbox}
    >
      {label}
    </z-boolean-checkbox>
  );
}
