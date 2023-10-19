# CSS Class Composer

Use this super tiny package to compose CSS class variants with ease.

- Easy to use
- Small bundle size

## Getting started

Install with npm or any other package manager

```sh
npm install css-class-composer
```

## Usage

```js
import { ccc } from 'css-class-composer';

const button = ccc('block cursor-pointer', {
  variants: {
    intent: {
      primary: 'text-white bg-blue-400',
      secondary: 'text-grey-900 bg-grey-300'
    },
    size: {
      regular: 'px-6 py-4',
      large: 'px-8 py-6'
    },
    state: {
      active: 'border'
    },
  },
  compounds: [
    {
      intent: 'primary',
      state: 'active',
      class: 'border-blue-500 shadow-md'
    }
  ],
  default: {
    intent: 'primary',
    size: 'regular'
  }
});

button();
// Returns: "block cursor-pointer text-white bg-blue-400 px-6 py-4"

button({ intent: 'secondary', size: 'large' });
// Returns: "block cursor-pointer text-grey-900 bg-grey-300 px-8 py-6"

button({ state: { active: true }});
// Returns: "block cursor-pointer border-blue-500 shadow-md text-white bg-blue-400 px-6 py-4 border"
```
