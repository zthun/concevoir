import { IZDeviceSizeChart } from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZFashionElement } from './fashion-element.mjs';
import { IZWithHeight, WithHeight } from './with-height.mjs';

const WithHeightElement = WithHeight<number>(ZFashionElement);

describe('WithHeight', () => {
  const createTestTarget = () => new WithHeightElement();

  beforeAll(() => {
    registerCustomElement('z-with-height', WithHeightElement);
  });

  describe('Fallback', () => {
    const shouldReturnFallback = (h: (t: IZWithHeight<number>, fb: number) => number) => {
      // Arrange.
      const target = createTestTarget();
      target.componentHeight = null;
      const expected = 42;
      // Act.
      const actual = h(target, expected);
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should return the fallback if component height is falsy (xl)', () => {
      shouldReturnFallback((t, f) => t.heightXl(f));
    });

    it('should return the fallback if component height is falsy (lg)', () => {
      shouldReturnFallback((t, f) => t.heightLg(f));
    });

    it('should return the fallback if component height is falsy (md)', () => {
      shouldReturnFallback((t, f) => t.heightMd(f));
    });

    it('should return the fallback if component height is falsy (sm)', () => {
      shouldReturnFallback((t, f) => t.heightSm(f));
    });

    it('should return the fallback if component height is falsy (xs)', () => {
      shouldReturnFallback((t, f) => t.heightXs(f));
    });
  });

  describe('Device Independent', () => {
    const height = 42;

    const shouldReturnSetValue = (h: (t: IZWithHeight<number>, f: number) => number) => {
      // Arrange.
      const target = createTestTarget();
      target.componentHeight = height;
      // Act.
      const actual = h(target, NaN);
      // Assert.
      expect(actual).toEqual(height);
    };

    it('should return the set value for the height (xl).', () => {
      shouldReturnSetValue((t, f) => t.heightXl(f));
    });

    it('should return the set value for the height (lg).', () => {
      shouldReturnSetValue((t, f) => t.heightLg(f));
    });

    it('should return the set value for the height (md).', () => {
      shouldReturnSetValue((t, f) => t.heightMd(f));
    });

    it('should return the set value for the height (sm).', () => {
      shouldReturnSetValue((t, f) => t.heightSm(f));
    });

    it('should return the set value for the height (xs).', () => {
      shouldReturnSetValue((t, f) => t.heightXs(f));
    });
  });

  describe('Device Dependant', () => {
    let height: IZDeviceSizeChart<number>;

    beforeEach(() => {
      height = {
        xl: 42,
        lg: 41,
        md: 40,
        sm: 39,
        xs: 38
      };
    });

    const shouldReturnHeight = (expected: number, h: (t: IZWithHeight<number>) => number) => {
      // Arrange.
      const target = createTestTarget();
      target.componentHeight = height;
      // Act.
      const actual = h(target);
      // Assert.
      expect(actual).toEqual(expected);
    };

    describe('Extra Large', () => {
      it('should return the xl height', () => {
        shouldReturnHeight(height.xl, (t) => t.heightXl(NaN));
      });
    });

    describe('Large', () => {
      it('should return the lg height', () => {
        shouldReturnHeight(height.lg!, (t) => t.heightLg(NaN));
      });

      it('should return the xl height if lg is not set', () => {
        delete height.lg;
        shouldReturnHeight(height.xl, (t) => t.heightLg(NaN));
      });
    });

    describe('Medium', () => {
      it('should return the md height', () => {
        shouldReturnHeight(height.md!, (t) => t.heightMd(NaN));
      });

      it('should return the lg height if md is not set', () => {
        delete height.md;
        shouldReturnHeight(height.lg!, (t) => t.heightMd(NaN));
      });

      it('should return the xl height if lg/md is not set', () => {
        delete height.md;
        delete height.lg;
        shouldReturnHeight(height.xl, (t) => t.heightMd(NaN));
      });
    });

    describe('Small', () => {
      it('should return the sm height', () => {
        shouldReturnHeight(height.sm!, (t) => t.heightSm(NaN));
      });

      it('should return the md height if sm is not set', () => {
        delete height.sm;
        shouldReturnHeight(height.md!, (t) => t.heightSm(NaN));
      });

      it('should return the lg height if sm/md is not set', () => {
        delete height.sm;
        delete height.md;
        shouldReturnHeight(height.lg!, (t) => t.heightSm(NaN));
      });

      it('should return the xl height if sm/md/lg is not set', () => {
        delete height.sm;
        delete height.md;
        delete height.lg;
        shouldReturnHeight(height.xl, (t) => t.heightSm(NaN));
      });
    });

    describe('Extra Small', () => {
      it('should return the xs height', () => {
        shouldReturnHeight(height.xs!, (t) => t.heightXs(NaN));
      });

      it('should return the sm height if xs is not set', () => {
        delete height.xs;
        shouldReturnHeight(height.sm!, (t) => t.heightXs(NaN));
      });

      it('should return the md height if xs/sm is not set', () => {
        delete height.xs;
        delete height.sm;
        shouldReturnHeight(height.md!, (t) => t.heightXs(NaN));
      });

      it('should return the lg height if xs/sm/md is not set', () => {
        delete height.xs;
        delete height.sm;
        delete height.md;
        shouldReturnHeight(height.lg!, (t) => t.heightXs(NaN));
      });

      it('should return the xl height if xs/sm/md/lg is not set', () => {
        delete height.xs;
        delete height.sm;
        delete height.md;
        delete height.lg;
        shouldReturnHeight(height.xl, (t) => t.heightXs(NaN));
      });
    });
  });
});
