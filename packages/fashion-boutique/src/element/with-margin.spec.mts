import { ZGapSize, ZSizeFixed, ZSizeVoid } from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { IZQuadrilateral } from '@zthun/helpful-fn';
import { beforeAll, describe, expect, it } from 'vitest';
import { ZFashionElement } from './fashion-element.mjs';
import { IZWithMargin, WithMargin } from './with-margin.mjs';

const WithMarginElement = WithMargin(ZFashionElement);

describe('WithMargin', () => {
  const createTestTarget = () => new WithMarginElement();

  beforeAll(() => {
    registerCustomElement('with-margin-element', WithMarginElement);
  });

  const shouldBeSetTo = (
    expected: ZGapSize,
    actualFn: (t: IZWithMargin) => ZGapSize,
    margin?: Partial<IZQuadrilateral<ZGapSize>>
  ) => {
    // Arrange.
    const target = createTestTarget();
    target.margin = margin;
    // Act.
    const actual = actualFn(target);
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe('Bottom', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.marginBottom());
    });

    it('should return the set padding', () => {
      const bottom = ZSizeFixed.Small;
      shouldBeSetTo(bottom, (t) => t.marginBottom(), { bottom });
    });
  });

  describe('Left', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.marginLeft());
    });

    it('should return the set padding', () => {
      const left = ZSizeFixed.Small;
      shouldBeSetTo(left, (t) => t.marginLeft(), { left });
    });
  });

  describe('Right', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.marginRight());
    });

    it('should return the set padding', () => {
      const right = ZSizeFixed.Small;
      shouldBeSetTo(right, (t) => t.marginRight(), { right });
    });
  });

  describe('Top', () => {
    it('should return none by default', () => {
      shouldBeSetTo(ZSizeVoid.None, (t) => t.marginTop());
    });

    it('should return the set padding', () => {
      const top = ZSizeFixed.Small;
      shouldBeSetTo(top, (t) => t.marginTop(), { top });
    });
  });
});
