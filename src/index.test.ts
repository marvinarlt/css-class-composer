import { test, expect } from 'vitest';
import { cc } from '$lib/index';

const composer = cc('block cursor-pointer', {
  variants: {
    intent: {
      primary: 'text-white bg-blue-400',
      secondary: 'text-grey-900 bg-grey-300',
    },
    size: {
      regular: 'px-6 py-4',
      large: 'px-8 py-6',
    },
    state: {
      active: 'border',
    },
    base: 'overflow-hidden',
  },
  compounds: [
    {
      intent: 'primary',
      state: 'active',
      class: 'border-blue-500 shadow-md',
    }
  ],
  default: {
    intent: 'primary',
    size: 'regular',
    base: true,
  }
});

test('Default styles', () => {
  expect(composer()).toBe('block cursor-pointer text-white bg-blue-400 px-6 py-4 overflow-hidden');
});

test('Flat variant based styles', () => {
  expect(composer({ intent: 'secondary', size: 'large', base: false })).toBe('block cursor-pointer text-grey-900 bg-grey-300 px-8 py-6');
});

test('Nested state based styles', () => {
  expect(composer({ state: { active: true }})).toBe('block cursor-pointer border-blue-500 shadow-md text-white bg-blue-400 px-6 py-4 overflow-hidden border');
});
