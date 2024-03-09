import { cssJoinDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { IZBoolean } from './boolean';

import { ZBooleanCheckboxElement } from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import './boolean-checkbox';

/**
 * A boolean component that can be checked, unchecked, or indeterminate
 *
 * @param props -
 *        The properties for this boolean component.
 *
 * @returns
 *        The JSX to render the checkbox
 */
export function ZBooleanSwitch(props: IZBoolean<boolean>) {
  const { className, disabled, label, value = false, onValueChange, name, fashion, required } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, false);
  const checkbox = useRef<HTMLElement>();

  useMemo(() => includeCustomElement(ZBooleanCheckboxElement), []);

  const handleChange = (e: Event) => {
    const target = e.target as ZBooleanCheckboxElement;
    _setValue(!!target.value);
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
      value={String(_value)}
      fashion={fashion}
      required={required}
      name={name}
      ref={checkbox}
    >
      {label}
    </z-boolean-checkbox>
  );
}
