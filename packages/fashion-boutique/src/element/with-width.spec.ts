import { IZDeviceValueMap } from '@zthun/fashion-tailor';
import { registerCustomElement } from '@zthun/helpful-dom';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZFashionElement } from './fashion-element.mjs';
import { IZWithWidth, WithWidth } from './with-width.mjs';

const WithWidthElement = WithWidth<number>(ZFashionElement);

describe('WithWidth', () => {
  const createTestTarget = () => new WithWidthElement();

  beforeAll(() => {
    registerCustomElement('z-with-width', WithWidthElement);
  });

  describe('Fallback', () => {
    const shouldReturnFallback = (h: (t: IZWithWidth<number>, fb: number) => number) => {
      // Arrange.
      const target = createTestTarget();
      target.componentWidth = null;
      const expected = 42;
      // Act.
      const actual = h(target, expected);
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should return the fallback if component width is falsy (xl)', () => {
      shouldReturnFallback((t, f) => t.widthXl(f));
    });

    it('should return the fallback if component width is falsy (lg)', () => {
      shouldReturnFallback((t, f) => t.widthLg(f));
    });

    it('should return the fallback if component width is falsy (md)', () => {
      shouldReturnFallback((t, f) => t.widthMd(f));
    });

    it('should return the fallback if component width is falsy (sm)', () => {
      shouldReturnFallback((t, f) => t.widthSm(f));
    });

    it('should return the fallback if component width is falsy (xs)', () => {
      shouldReturnFallback((t, f) => t.widthXs(f));
    });
  });

  describe('Device Independent', () => {
    const width = 42;

    const shouldReturnSetValue = (h: (t: IZWithWidth<number>, f: number) => number) => {
      // Arrange.
      const target = createTestTarget();
      target.componentWidth = width;
      // Act.
      const actual = h(target, NaN);
      // Assert.
      expect(actual).toEqual(width);
    };

    it('should return the set value for the width (xl).', () => {
      shouldReturnSetValue((t, f) => t.widthXl(f));
    });

    it('should return the set value for the width (lg).', () => {
      shouldReturnSetValue((t, f) => t.widthLg(f));
    });

    it('should return the set value for the width (md).', () => {
      shouldReturnSetValue((t, f) => t.widthMd(f));
    });

    it('should return the set value for the width (sm).', () => {
      shouldReturnSetValue((t, f) => t.widthSm(f));
    });

    it('should return the set value for the width (xs).', () => {
      shouldReturnSetValue((t, f) => t.widthXs(f));
    });
  });

  describe('Device Dependant', () => {
    let width: IZDeviceValueMap<number>;

    beforeEach(() => {
      width = {
        xl: 42,
        lg: 41,
        md: 40,
        sm: 39,
        xs: 38
      };
    });

    const shouldReturnWidth = (expected: number, h: (t: IZWithWidth<number>) => number) => {
      // Arrange.
      const target = createTestTarget();
      target.componentWidth = width;
      // Act.
      const actual = h(target);
      // Assert.
      expect(actual).toEqual(expected);
    };

    describe('Extra Large', () => {
      it('should return the xl width', () => {
        shouldReturnWidth(width.xl, (t) => t.widthXl(NaN));
      });
    });

    describe('Large', () => {
      it('should return the lg width', () => {
        shouldReturnWidth(width.lg!, (t) => t.widthLg(NaN));
      });

      it('should return the xl width if lg is not set', () => {
        delete width.lg;
        shouldReturnWidth(width.xl, (t) => t.widthLg(NaN));
      });
    });

    describe('Medium', () => {
      it('should return the md width', () => {
        shouldReturnWidth(width.md!, (t) => t.widthMd(NaN));
      });

      it('should return the lg width if md is not set', () => {
        delete width.md;
        shouldReturnWidth(width.lg!, (t) => t.widthMd(NaN));
      });

      it('should return the xl width if lg/md is not set', () => {
        delete width.md;
        delete width.lg;
        shouldReturnWidth(width.xl, (t) => t.widthMd(NaN));
      });
    });

    describe('Small', () => {
      it('should return the sm width', () => {
        shouldReturnWidth(width.sm!, (t) => t.widthSm(NaN));
      });

      it('should return the md width if sm is not set', () => {
        delete width.sm;
        shouldReturnWidth(width.md!, (t) => t.widthSm(NaN));
      });

      it('should return the lg width if sm/md is not set', () => {
        delete width.sm;
        delete width.md;
        shouldReturnWidth(width.lg!, (t) => t.widthSm(NaN));
      });

      it('should return the xl width if sm/md/lg is not set', () => {
        delete width.sm;
        delete width.md;
        delete width.lg;
        shouldReturnWidth(width.xl, (t) => t.widthSm(NaN));
      });
    });

    describe('Extra Small', () => {
      it('should return the xs width', () => {
        shouldReturnWidth(width.xs!, (t) => t.widthXs(NaN));
      });

      it('should return the sm width if xs is not set', () => {
        delete width.xs;
        shouldReturnWidth(width.sm!, (t) => t.widthXs(NaN));
      });

      it('should return the md width if xs/sm is not set', () => {
        delete width.xs;
        delete width.sm;
        shouldReturnWidth(width.md!, (t) => t.widthXs(NaN));
      });

      it('should return the lg width if xs/sm/md is not set', () => {
        delete width.xs;
        delete width.sm;
        delete width.md;
        shouldReturnWidth(width.lg!, (t) => t.widthXs(NaN));
      });

      it('should return the xl width if xs/sm/md/lg is not set', () => {
        delete width.xs;
        delete width.sm;
        delete width.md;
        delete width.lg;
        shouldReturnWidth(width.xl, (t) => t.widthXs(NaN));
      });
    });
  });
});
