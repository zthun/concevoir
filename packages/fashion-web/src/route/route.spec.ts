import { describe, expect, it } from 'vitest';
import { ZRouteBuilder } from './route';

describe('ZRouteOptionBuilder', () => {
  function createTestTarget() {
    return new ZRouteBuilder();
  }

  describe('Properties', () => {
    it('should set the path.', () => {
      const expected = '/path/to/content';
      expect(createTestTarget().path(expected).build().path).toEqual(expected);
    });

    it('should set the name.', () => {
      const expected = 'Information';
      expect(createTestTarget().name(expected).build().name).toEqual(expected);
    });

    it('should set the description.', () => {
      const expected = 'Description of route';
      expect(createTestTarget().description(expected).build().description).toEqual(expected);
    });

    it('should set the avatar.', () => {
      const expected = '<img src="avatar.png" />';
      expect(createTestTarget().avatar(expected).build().avatar).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another route option.', () => {
      const avatar = Buffer.from('1234', 'binary');
      const expected = new ZRouteBuilder().avatar(avatar).name('Content').path('/path/to/content').build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
