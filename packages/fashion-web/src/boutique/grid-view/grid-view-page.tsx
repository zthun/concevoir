import { ZCard, ZGridView, ZIconFontAwesome, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZBrand, ZBrands } from '@zthun/helpful-brands';
import { ZOrientation } from '@zthun/helpful-fn';
import { ZDataSearchFields, ZDataSourceStatic, ZDataSourceStaticOptionsBuilder } from '@zthun/helpful-query';
import React from 'react';

const ZBrandDataSourceOptions = new ZDataSourceStaticOptionsBuilder()
  .search(new ZDataSearchFields(['id', 'name']))
  .delay(1000)
  .build();
const ZBrandDataSource = new ZDataSourceStatic(ZBrands.slice(), ZBrandDataSourceOptions);

/**
 * Represents a demo for grid views.
 *
 * @returns The JSX to render the page.
 */
export function ZGridViewPage() {
  const renderItem = (item: IZBrand) => (
    <ZCard key={item.id} heading={item.name} avatar={<ZIconFontAwesome width={ZSizeFixed.Small} name='hashtag' />}>
      <ZStack justifyContent='center' orientation={ZOrientation.Horizontal}>
        <ZIconFontAwesome family='brands' name={item.id} width={ZSizeFixed.Large} />
      </ZStack>
    </ZCard>
  );

  return (
    <ZGridView
      className='ZGridViewPage-root'
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: '1fr 1fr 1fr 1fr',
        columnsLg: '1fr 1fr 1fr',
        columnsMd: '1fr 1fr',
        columnsSm: '1fr'
      }}
      renderItem={renderItem}
      dataSource={ZBrandDataSource}
    />
  );
}
