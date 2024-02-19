// @vitest-environment jsdom
import { ZFashionBuilder, ZFashionPriority, ZFashionSeverity, hex } from '@zthun/fashion-theme';
import { cssVariable, mutateAttribute, registerCustomElement } from '@zthun/helpful-dom';
import { beforeAll, describe, expect, it } from 'vitest';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';
import { ZFashionElement } from './fashion-element.mjs';
import { WithFashion } from './with-fashion.mjs';

const WithFashionElement = class extends WithFashion(ZFashionElement) {};

describe('WithFashion', () => {
  const name = ZFashionSeverity.Error;
  const gray = new ZFashionBuilder().namedSuccess().main(hex(0xaaaaaa)).build();

  beforeAll(() => {
    registerCustomElement('z-with-fashion-element', WithFashionElement);
  });

  const createTestTarget = () => new WithFashionElement();

  describe('Local Fashion', () => {
    it('should return the color defined in the local fashion state', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = gray;
      const { main: expected } = gray;
      // Act.
      const actual = target.color('main', name);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should return the first color defined in the local fashion state for an array', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = gray;
      const { main: expected } = gray;
      // Act.
      const actual = target.color(['border', 'main'], name);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Global Fashion', () => {
    it('should return the variable color defined as an attribute if the fashion is null', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = null;
      mutateAttribute(target, 'fashion', ZFashionPriority.Secondary);
      const property = ZFashionThemeElement.property(ZFashionPriority.Secondary, 'contrast');
      const expected = cssVariable(property);
      // Act.
      const actual = target.color('contrast', name);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return the variable color fallback if no fashion or attribute is set', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = null;
      mutateAttribute(target, 'fashion', null);
      const property = ZFashionThemeElement.property(name, 'contrast');
      const expected = cssVariable(property);
      // Act.
      const actual = target.color('contrast', name);
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
