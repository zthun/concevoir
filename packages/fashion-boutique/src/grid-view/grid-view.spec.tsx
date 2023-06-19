import { IZCircusDriver, ZCircusBy, ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import {
  IZDataRequest,
  IZDataSource,
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder
} from '@zthun/helpful-query';
import { range } from 'lodash';
import React from 'react';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZGridView } from './grid-view';
import { ZGridViewComponentModel } from './grid-view.cm';

describe('ZGridView', () => {
  let request: IZDataRequest | undefined;
  let onValueChange: Mock | undefined;
  let dataSource: IZDataSource<number> | undefined;
  let renderItem: Mock;
  let _driver: IZCircusDriver;
  let _target: ZGridViewComponentModel;

  async function createTestTarget() {
    const element = (
      <ZGridView renderItem={renderItem} dataSource={dataSource} value={request} onValueChange={onValueChange} />
    );
    _driver = await new ZCircusSetupRenderer(element).setup();
    _target = await ZCircusBy.first(_driver, ZGridViewComponentModel);
    return _target;
  }

  beforeEach(() => {
    request = undefined;
    dataSource = undefined;
    onValueChange = undefined;

    renderItem = vi.fn();
    renderItem.mockImplementation((i) => (
      <div key={i} className='item' data-item={i}>
        {i}
      </div>
    ));
  });

  afterEach(async () => {
    await _target?.load();
    await _driver.destroy();
  });

  describe('Page Size', () => {
    const data = range(0, 100);

    beforeEach(() => {
      dataSource = new ZDataSourceStatic(data);
    });

    it('should render available items', async () => {
      // Arrange.
      request = new ZDataRequestBuilder().build();
      const target = await createTestTarget();
      // Act.
      await target.load();
      // Assert.
      expect(renderItem).toHaveBeenCalledTimes(data.length);
    });

    it('should not render any errors', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.load();
      const actual = await target.error();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should render items up to the page size of the value', async () => {
      // Arrange.
      request = new ZDataRequestBuilder().page(1).size(24).build();
      const target = await createTestTarget();
      // Act.
      await target.load();
      // Assert.
      expect(renderItem).toHaveBeenCalledTimes(request.size!);
    });

    it('should render items after the page size changes', async () => {
      // Arrange.
      const target = await createTestTarget();
      const size = await target.pageSize();
      await target.load();
      const expected = 48;
      // Act.
      await size.select(expected);
      await target.load();
      const actual = await target.driver.query('.item');
      // Assert.
      expect(actual.length).toEqual(expected);
    });
  });

  describe('Pagination', () => {
    it('should move to the next page', async () => {
      // Arrange.
      dataSource = new ZDataSourceStatic(range(0, 100));
      vi.spyOn(dataSource, 'retrieve');
      const target = await createTestTarget();
      const pagination = await target.pagination();
      // Act.
      await pagination.next();
      // Assert.
      expect(dataSource.retrieve).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));
    });
  });

  describe('Search', () => {
    it('should search for a specific item', async () => {
      // Arrange.
      onValueChange = vi.fn();
      const expected = '100';
      const target = await createTestTarget();
      await target.load();
      const search = await target.search();
      // Act.
      await search.keyboard(expected, ZCircusKeyboardQwerty.enter);
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ search: expected }));
    });
  });

  describe('Refresh', () => {
    beforeEach(() => {
      const options = new ZDataSourceStaticOptionsBuilder<number>().delay(500).build();
      dataSource = new ZDataSourceStatic(range(0, 10), options);
    });

    it('should render a loader while data is being loaded', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.loading();
      await target.load();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should refresh the data when the refresh button is clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.load();
      // Act.
      await (await target.refresh()).click();
      const actual = await target.loading();
      await target.load();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Error', () => {
    let error: Error;

    beforeEach(() => {
      error = new Error('Something went wrong');
      dataSource = new ZDataSourceStatic(error);
    });

    it('should render the error message', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.error();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });
});
