import { IZSort } from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { ZLabeled } from 'src/label/labeled';
import { IZComponentValue } from '../component/component-value';

export interface IZSortEditor extends IZComponentValue<IZSort[]> {}

export function ZSortEditor(props: IZSortEditor) {
  const { value, onValueChange } = props;
  useAmbassadorState(value, onValueChange, []);

  return (
    <ZLabeled className='ZSortEditor-root' LabelProps={{ label: 'Sort' }}>
      {() => 'Coming Soon'}
    </ZLabeled>
  );
}
