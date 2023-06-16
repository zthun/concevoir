import { ZBox, ZCard, ZH3, ZImageSource, ZParagraph, ZTable } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZPerson, ZDataSourcePeople, ZPersonBuilder } from '@zthun/helpful-people';
import React, { useMemo, useState } from 'react';
import { ZFashionRouteTable } from '../../routes';
import { ZChoiceDropDownSize, ZFixedSizes } from '../common/choice-drop-down-size';

/**
 * Represents a demo for grid views.
 *
 * @returns The JSX to render the page.
 */
export function ZTablePage() {
  const excluded = useMemo(() => ['id'], []);
  const dataSource = useMemo(() => new ZDataSourcePeople(), []);
  const columns = useMemo(() => ZPersonBuilder.metadata().filter((c) => excluded.indexOf(c.id) < 0), []);
  const [height, setHeight] = useState<ZSizeFixed | undefined>();

  return (
    <ZCard
      className='ZTablePage-root'
      heading={ZFashionRouteTable.name}
      subHeading={ZFashionRouteTable.description}
      avatar={<ZImageSource src={ZFashionRouteTable.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Tabular data can be a great way to show organized data to a user that is used to spreadsheets. The main
        advantage to tables is that they can be very familiar to most. Do be careful about using them as it may be
        better to use a grid view instead. Tables tend to not be mobile friendly and they usually do not render well on
        small devices.
      </ZParagraph>

      <ZBox margin={{ top: ZSizeFixed.Large, bottom: ZSizeFixed.ExtraLarge }}>
        <ZTable
          className='ZTablePage-table'
          dataSource={dataSource}
          columns={columns}
          height={height}
          identifier={(r: IZPerson) => r.id}
        />
      </ZBox>

      <ZH3>Options</ZH3>
      <ZChoiceDropDownSize label='Height' sizes={ZFixedSizes} value={height} onValueChange={setHeight} />
    </ZCard>
  );
}
