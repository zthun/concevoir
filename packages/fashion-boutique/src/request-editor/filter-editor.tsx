import { IZFilter } from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { IZComponentValue } from 'src/component/component-value';
import { ZLabeled } from '../label/labeled';

export interface IZFilterEditor extends IZComponentValue<IZFilter> {}

export function ZFilterEditor(props: IZFilterEditor) {
  const { value, onValueChange } = props;
  useAmbassadorState(value, onValueChange);

  return (
    <ZLabeled className='ZFilterEditor-root' LabelProps={{ label: 'Filter' }}>
      {() => 'Coming Soon'}
    </ZLabeled>
  );
}
