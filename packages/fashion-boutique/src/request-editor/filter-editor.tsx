import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZFilter } from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZLabeled } from '../label/labeled';

export interface IZFilterEditor extends IZComponentValue<IZFilter>, IZComponentStyle, IZComponentName {}

export function ZFilterEditor(props: IZFilterEditor) {
  const { className, value, name, onValueChange } = props;
  useAmbassadorState(value, onValueChange);

  return (
    <ZLabeled className={cssJoinDefined('ZFilterEditor-root', className)} LabelProps={{ label: 'Filter' }} name={name}>
      {() => 'Coming Soon'}
    </ZLabeled>
  );
}
