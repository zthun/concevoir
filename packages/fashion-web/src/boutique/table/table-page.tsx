import { ZCard, ZImageSource, ZTable } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZPerson, ZDataSourcePeople, ZPersonBuilder } from '@zthun/helpful-people';
import React, { useMemo } from 'react';
import { ZFashionRouteTable } from '../../routes';

/**
 * Represents a demo for grid views.
 *
 * @returns The JSX to render the page.
 */
export function ZTablePage() {
  const dataSource = useMemo(() => new ZDataSourcePeople(50000), []);
  const columns = useMemo(() => ZPersonBuilder.metadata(), []);

  return (
    <ZCard
      className='ZTablePage-root'
      heading={ZFashionRouteTable.name}
      subHeading={ZFashionRouteTable.description}
      avatar={<ZImageSource src={ZFashionRouteTable.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZTable
        className='ZTablePage-table'
        dataSource={dataSource}
        columns={columns}
        identifier={(r: IZPerson) => r.id}
      />
    </ZCard>
  );
}
