import { describe, expect, it } from 'vitest';
import { brighten, fromRgb } from '../color/color.mjs';
import { hex } from '../color/hex.mjs';
import { hsl } from '../color/hsl.mjs';
import { black, rgb, white } from '../color/rgb.mjs';
import { ZFashionBuilder } from './fashion.mjs';

describe('ZFashion', () => {
  function createTestTarget() {
    return new ZFashionBuilder();
  }

  describe('Properties', () => {
    it('should set the main fashion', () => {
      const expected = rgb(255, 0, 0);
      expect(
        createTestTarget()
          .main(rgb(255, 0, 0))
          .build().main
      ).toEqual(expected);
    });

    it('should set the contrast fashion', () => {
      const expected = rgb(255, 255, 0, 0.5);
      expect(createTestTarget().contrast(expected).build().contrast).toEqual(expected);
    });

    it('should set the border fashion', () => {
      const expected = rgb(255, 255, 0, 0.5);
      expect(createTestTarget().border(expected).build().border).toEqual(expected);
    });
  });

  describe('Spectrum', () => {
    it('should set the main fashion', () => {
      const expected = rgb(255, 0, 0);
      expect(
        createTestTarget()
          .spectrum(fromRgb(255, 0, 0))
          .build().main
      ).toEqual(expected);
    });

    it('should set the dark fashion', () => {
      const color = fromRgb(255, 0, 0);
      const amount = 100;
      const expected = hex(brighten(color, -amount));
      expect(createTestTarget().spectrum(color, amount).build().dark).toEqual(expected);
    });

    it('should set the light fashion', () => {
      const color = fromRgb(255, 0, 0);
      const amount = 100;
      const expected = hex(brighten(color, amount));
      expect(createTestTarget().spectrum(color, amount).build().light).toEqual(expected);
    });

    it('should set the contrast fashion to white when it has a higher contrast ratio', () => {
      expect(createTestTarget().spectrum(0).build().contrast).toEqual(white());
    });

    it('should set the contrast fashion to black when it has a higher contrast ratio', () => {
      expect(createTestTarget().spectrum(0xffffff).build().contrast).toEqual(black());
    });

    it('should set the focus fashion', () => {
      expect(createTestTarget().spectrum(0xffffff).build().focus.main).toBeTruthy();
    });

    it('should set the hover fashion', () => {
      expect(createTestTarget().spectrum(0xffffff).build().hover.main).toBeTruthy();
    });
  });

  describe('Swap', () => {
    it('should swap the main and contrast', () => {
      const main = rgb(0, 0, 0);
      const contrast = rgb(255, 255, 255);
      const target = createTestTarget().contrast(contrast).main(main).swap().build();
      expect(target.main).toEqual(contrast);
      expect(target.contrast).toEqual(main);
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
