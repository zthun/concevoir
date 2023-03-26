import { describe, expect, it } from 'vitest';
import { hsl } from '../color/hsl';
import { rgb, white } from '../color/rgb';
import { ZFashionBuilder } from './fashion';

describe('ZFashion', () => {
  function createTestTarget() {
    return new ZFashionBuilder();
  }

  describe('Properties', () => {
    it('should set the main fashion', () => {
      const expected = rgb(255, 0, 0);
      expect(createTestTarget().main(rgb(255, 0, 0)).build().main).toEqual(expected);
    });

    it('should set the contrast fashion', () => {
      const expected = rgb(255, 255, 0, 0.5);
      expect(createTestTarget().contrast(expected).build().contrast).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another complementary object', () => {
      const main = hsl(220, 56, 72, 0.32);
      const contrast = white();
      const expected = createTestTarget().main(main).contrast(contrast).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
