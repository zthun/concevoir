import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZSort } from '@zthun/helpful-query';
import { useAmbassadorState } from '@zthun/helpful-react';
import React from 'react';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZLabeled } from '../label/labeled';

export interface IZSortEditor extends IZComponentValue<IZSort[]>, IZComponentStyle, IZComponentName {}

export function ZSortEditor(props: IZSortEditor) {
  const { className, name, value, onValueChange } = props;
  useAmbassadorState(value, onValueChange, []);

  return (
    <ZLabeled className={cssJoinDefined('ZSortEditor-root', className)} LabelProps={{ label: 'Sort' }} name={name}>
      {() => 'Coming Soon'}
    </ZLabeled>
  );
}
