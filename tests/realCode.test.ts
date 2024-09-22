import { getItem, saveItem } from '@/lib/utils';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';

describe('Local Storage Testing', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
  });

  test('Save Item to local storage', () => {
    expect(saveItem('cat', '5'));
  });

  test('Getting an item from local storage', () => {
    expect(getItem('cat')).toBe('5');
  });

});
