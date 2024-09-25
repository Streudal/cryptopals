import { getItem, saveItem, removeItem, clearItems } from '@/lib/utils';
import { describe, expect, test } from 'vitest';

describe('Local Storage Testing', () => {
  // beforeEach(() => {
  //   vitest.spyOn(Storage.prototype, 'getItem');
  //   vitest.spyOn(Storage.prototype, 'setItem');
  // });

  test('Save Item to local storage', () => {
    expect(saveItem('cat', '5'));
  });

  test('Getting an item from local storage', () => {
    expect(getItem('cat')).toBe('5');
  });

  test('Remove item from local storage', () => {
    expect(removeItem('cat')).toBe(null);
  });

  test('Clear all items from local storage', () => {
    expect(clearItems()).toBe(null);
  });
});
