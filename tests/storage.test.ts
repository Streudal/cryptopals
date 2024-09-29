import { clearItems, getItem, removeItem, saveItem } from '@/lib/utils';
import { describe, expect, test } from 'vitest';

describe('Local Storage Testing', () => {
  test('Save Item to local storage', () => {
    expect(saveItem('cat', '5'));
  });

  test('Getting an item from local storage', () => {
    expect(getItem('cat')).toBe('5');
  });

  test('Remove item from local storage', () => {
    expect(removeItem('cat')).toBeUndefined();
  });

  test('Clear all items from local storage', () => {
    clearItems();
    expect(localStorage.length).toBe(0);
  });
});
