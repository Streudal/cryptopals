import { getItem } from '@/lib/utils';
import { describe, expect, test } from 'vitest';

describe('Test Challenge Solutions', () => {
  test('Challenge 1', () => {
    expect(getItem('challenge-1')).toBeNull();
  });

});
