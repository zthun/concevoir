import { describe, expect, it } from 'vitest';
import { white } from '../color/rgb';
import { ZFashionBuilder } from '../fashion/fashion';
import { ZFashionThemeBuilder, createTheme } from './fashion-theme';

describe('ZFashionDesignBuilder', () => {
  function createTestTarget() {
    return new ZFashionThemeBuilder();
  }

  describe('Construction', () => {
    it('should create the light theme', () => {
      expect(createTheme()).toBeTruthy();
    });
  });

  describe('Name', () => {
    it('should set the name', () => {
      const expected = 'Test';
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });
  });

  describe('Priority', () => {
    it('should set primary', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().primary(expected).build().primary).toEqual(expected);
    });

    it('should set secondary', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().secondary(expected).build().secondary).toEqual(expected);
    });
  });

  describe('Severity', () => {
    it('should set success', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().success(expected).build().success).toEqual(expected);
    });

    it('should set warning', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().warning(expected).build().warning).toEqual(expected);
    });

    it('should set error', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().error(expected).build().error).toEqual(expected);
    });

    it('should set info', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().info(expected).build().info).toEqual(expected);
    });
  });

  describe('Space', () => {
    it('should set body', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().body(expected).build().body).toEqual(expected);
    });

    it('should set surface', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().surface(expected).build().surface).toEqual(expected);
    });
  });

  describe('Contrast', () => {
    it('should set light', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().light(expected).build().light).toEqual(expected);
    });

    it('should set dark', () => {
      const expected = new ZFashionBuilder().build();
      expect(createTestTarget().dark(expected).build().dark).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another design', () => {
      const primary = new ZFashionBuilder().contrast(white()).build();
      const expected = createTestTarget().primary(primary).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
