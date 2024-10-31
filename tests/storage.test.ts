import { clearItems, getItem, removeItem, saveItem } from '@/lib/utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Challenge Score Component Basis Path Testing', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  // Clean up after tests
  afterEach(() => {
    localStorage.clear();
  });

  // Test Case 1: Basic Save Path - Left Button (Success)
  it('should save a completed challenge score', () => {
    const key = 'Set 1 - Challenge 1';
    const value = JSON.stringify({ value: 1, solved: true });

    saveItem(key, value);
    const result = getItem(key);

    expect(result).toBe(value);
    expect(JSON.parse(result!)).toEqual({ value: 1, solved: true });
  });

  // Test Case 2: Basic Save Path - Right Button (Failure)
  it('should save an incomplete challenge score', () => {
    const key = 'Set 1 - Challenge 1';
    const value = JSON.stringify({ value: 0, solved: false });

    saveItem(key, value);
    const result = getItem(key);

    expect(result).toBe(value);
    expect(JSON.parse(result!)).toEqual({ value: 0, solved: false });
  });

  // Test Case 3: Update Existing Score Path
  it('should update existing challenge score', () => {
    const key = 'Set 1 - Challenge 1';
    const initialValue = JSON.stringify({ value: 0, solved: false });
    const updatedValue = JSON.stringify({ value: 1, solved: true });

    saveItem(key, initialValue);
    saveItem(key, updatedValue);
    const result = getItem(key);

    expect(result).toBe(updatedValue);
    expect(JSON.parse(result!)).toEqual({ value: 1, solved: true });
  });

  // Test Case 4: Multiple Challenges Path
  it('should handle multiple challenge scores', () => {
    const keys = [
      'Set 1 - Challenge 1',
      'Set 1 - Challenge 2',
      'Set 1 - Challenge 3',
      'Set 1 - Challenge 4',
      'Set 1 - Challenge 5',
      'Set 1 - Challenge 6',
      'Set 1 - Challenge 7',
      'Set 1 - Challenge 8',
    ];

    keys.forEach(key => {
      saveItem(key, JSON.stringify({ value: 1, solved: true }));
    });

    keys.forEach(key => {
      const result = getItem(key);
      expect(JSON.parse(result!)).toEqual({ value: 1, solved: true });
    });
  });

  // Test Case 5: Remove Score Path
  it('should remove a challenge score', () => {
    const key = 'Set 1 - Challenge 1';
    const value = JSON.stringify({ value: 1, solved: true });

    saveItem(key, value);
    removeItem(key);
    const result = getItem(key);

    expect(result).toBeNull();
  });

  // Test Case 6: Clear All Scores Path
  it('should clear all challenge scores', () => {
    const keys = [
      'Set 1 - Challenge 1',
      'Set 1 - Challenge 2',
      'Set 1 - Challenge 3',
      'Set 1 - Challenge 4',
      'Set 1 - Challenge 5',
      'Set 1 - Challenge 6',
      'Set 1 - Challenge 7',
      'Set 1 - Challenge 8',
    ];

    keys.forEach(key => {
      saveItem(key, JSON.stringify({ value: 1, solved: true }));
    });

    clearItems();

    keys.forEach(key => {
      const result = getItem(key);
      expect(result).toBeNull();
    });
  });

  // Test Case 7: Invalid Storage Key Path
  it('should handle invalid storage keys', () => {
    const invalidKey = 'Invalid Key';
    const value = JSON.stringify({ value: 1, solved: true });

    saveItem(invalidKey as any, value);
    const result = getItem(invalidKey as any);

    expect(result).toBe(value);
  });
});
