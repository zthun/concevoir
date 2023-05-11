import { ZCard, ZGridView, ZIconFontAwesome, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation } from '@zthun/helpful-fn';
import { ZDataSourceStatic } from '@zthun/helpful-query';
import { startCase } from 'lodash';
import React from 'react';

const SocialMediaQuery = new ZDataSourceStatic([
  'facebook',
  'twitter',
  'instagram',
  'linkedin',
  'github',
  'youtube',
  'wordpress',
  'slack',
  'apple',
  'docker',
  'windows',
  'linux'
]);

/**
 * Represents a demo for grid views.
 *
 * @returns The JSX to render the page.
 */
export function ZGridViewPage() {
  const renderItem = (item: string) => (
    <ZCard heading={startCase(item)} avatar={<ZIconFontAwesome width={ZSizeFixed.Small} name='hashtag' />}>
      <ZStack justifyContent='center' orientation={ZOrientation.Horizontal}>
        <ZIconFontAwesome key={item} family='brands' name={item} width={ZSizeFixed.Large} />
      </ZStack>
    </ZCard>
  );

  return (
    <ZGridView
      className='ZGridViewPage-root'
      GridProps={{ gap: ZSizeFixed.Small, columns: '1fr 1fr 1fr' }}
      renderItem={renderItem}
      dataSource={SocialMediaQuery}
    />
  );
}
