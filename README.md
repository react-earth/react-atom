![title](media/repo-header.svg)

<p align="center">
<a href="https://github.com/react-earth/react-atom" target="\_parent"><img alt="star" src="https://img.shields.io/github/stars/react-earth/react-atom.svg?style=social&label=Star" /></a>
<a href="https://www.npmjs.com/package/react-atom-core" target="\_parent"><img src="https://img.shields.io/npm/v/react-atom-core" alt="version"></a>
<a href="https://www.npmjs.com/package/react-atom-core" target="\_parent"><img alt="minzip" src="https://img.badgesize.io/https:/unpkg.com/react-atom-core@latest/dist/index.esm.js?compression=gzip" /></a>
<a href="https://www.npmjs.com/package/react-atom-core" target="\_parent"><img alt="downloads" src="https://img.shields.io/npm/dm/react-atom.svg" /></a>
<a href="https://github.com/react-earth/react-atom" target="\_parent"><img alt="license" src="https://img.shields.io/npm/l/react-atom-core" /></a>
</p>

## Packages 📦

- `react-atom-core`: convert atomically props to styles.
- `react-atom-emotion`: [emotion](https://github.com/emotion-js/emotion) adapter for `react-atom-core`.
- `react-atom-styled`: [styled-components](https://github.com/styled-components/styled-components) adapter for `react-atom-core`.

## Quick Features 🥳

- Build apps atomically with your design tokens.
- Supported emotion and styled-components.
- Built with typescript, provide type protection, code autocompletion, make your app robust.

## How to use 📖

### Install package

```sh
# use emotion
npm install @emotion/react @emotion/styled react-atom-emotion

# use styled-components
npm install styled-components react-atom-styled
```

### Define your design tokens

Create a file named `designTokens.ts` in your project.

```typescript
export const designTokens = {
  spacing: {
    half: '4px',
    '1x': '8px',
    '2x': '16px',
    '4x': '32px',
    full: '100%',
  },
  color: {
    primary: '#60A5FA',
    background: '#EFF6FF',
  },
  fontSize: {
    title: '32px',
    body: '16px',
  },
};
```

### Create Atom component

> Use react-atom-emotion as example, you also can use react-atom-styled.

Create a file named `Atom.tsx` in your project.

```tsx
import { atom } from 'react-atom-emotion';
import { designTokens } from './designTokens';

export const Atom = atom(designTokens);
```

### Build your app atomically with your design tokens

```tsx
import { Atom } from './Atom.tsx';

const App = () => {
  return (
    <Atom
      w="full"
      h="full"
      flex
      flexDirection="column"
      flexJustify="center"
      flexAlign="center"
      gap="1x"
      c="primary"
      bg="background"
    >
      <Atom fontSize="title" fontWeight="bold">
        Hello, React Atom!
      </Atom>
      <Atom fontSize="body">Build your application with your design!</Atom>
    </Atom>
  );
};
```

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-atom-demo-xj9dt7?file=/src/App.tsx)
