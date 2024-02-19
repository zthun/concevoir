import { ZGapSize, ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { IZQuadrilateral } from '@zthun/helpful-fn';
import { beforeAll, describe, expect, it } from 'vitest';
import { ZFashionElement } from './fashion-element.mjs';
import { IZWithPadding, WithPadding } from './with-padding.mjs';

const WithPaddingElement = WithPadding(ZFashionElement);

describe('WithPadding', () => {
  const createTestTarget = () => new WithPaddingElement();

  beforeAll(() => {
    registerCustomElement('with-padding-element', WithPaddingElement);
  });

  const shouldBeSetTo = (
    expected: ZGapSize,
    actualFn: (t: IZWithPadding) => ZGapSize,
    padding?: Partial<IZQuadrilateral<ZGapSize>>
  ) => {
    // Arrange.
    const target = createTestTarget();
    target.padding = padding;
    // Act.
    const actual = actualFn(target);
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe('Bottom', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.paddingBottom());
    });

    it('should return the set padding', () => {
      const bottom = ZSizeFixed.Small;
      shouldBeSetTo(bottom, (t) => t.paddingBottom(), { bottom });
    });
  });

  describe('Left', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.paddingLeft());
    });

    it('should return the set padding', () => {
      const left = ZSizeFixed.Small;
      shouldBeSetTo(left, (t) => t.paddingLeft(), { left });
    });
  });

  describe('Right', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.paddingRight());
    });

    it('should return the set padding', () => {
      const right = ZSizeFixed.Small;
      shouldBeSetTo(right, (t) => t.paddingRight(), { right });
    });
  });

  describe('Top', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.paddingTop());
    });

    it('should return the set padding', () => {
      const top = ZSizeFixed.Small;
      shouldBeSetTo(top, (t) => t.paddingTop(), { top });
    });
  });
});
