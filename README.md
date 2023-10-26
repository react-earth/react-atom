![title](media/repo-header.svg)

<p align="center">
<a href="https://github.com/react-earth/react-atom" ><img alt="star" src="https://img.shields.io/github/stars/react-earth/react-atom.svg?style=social&label=Star" /></a>
<a href="https://www.npmjs.com/package/react-atom-core" ><img src="https://img.shields.io/npm/v/react-atom-core" alt="version"></a>
<a href="https://www.npmjs.com/package/react-atom-core" ><img alt="minzip" src="https://img.badgesize.io/https:/unpkg.com/react-atom-core@latest/dist/index.esm.js?compression=gzip" /></a>
<a href="https://www.npmjs.com/package/react-atom-core" ><img alt="downloads" src="https://img.shields.io/npm/dm/react-atom.svg" /></a>
<a href="https://github.com/react-earth/react-atom" ><img alt="license" src="https://img.shields.io/npm/l/react-atom-core" /></a>
</p>

## Packages 📦

- [react-atom-core](https://www.npmjs.com/package/react-atom-core): convert react atomically props to styles.
- [react-atom-emotion](https://www.npmjs.com/package/react-atom-emotion): react atom for [emotion](https://github.com/emotion-js/emotion).
- [react-atom-styled](https://www.npmjs.com/package/react-atom-styled): react atom for [styled-components](https://github.com/styled-components/styled-components).

## Quick Features 🥳

- Build application atomically with your design tokens.
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
    '1x': '8px',
    '2x': '16px',
    '4x': '32px',
    full: '100%',
    fullW: '100vw',
    fullH: '100vh',
  },
  color: {
    primary: '#4CB074',
    background: '#ECF5F0',
  },
  fontSize: {
    xxl: '32px',
    xl: '38px',
    lg: '24px',
    md: '16px',
    sm: '14px',
    xs: '12px',
  },
};
```

### Create Atom component

Create a file named `Atom.tsx` in your project.

```tsx
// You also can use react-atom-styled here
import atom from 'react-atom-emotion';
import { designTokens } from './designTokens';

export const Atom = atom(designTokens);
```

### Build application atomically with your design tokens

```tsx
import { Atom } from './Atom';

export default function App() {
  return (
    <Atom
      w="fullW"
      h="fullH"
      flex
      flexDirection="column"
      flexJustify="center"
      flexAlign="center"
      gap="1x"
      c="primary"
      bg="background"
    >
      <Atom fontSize="xxl" fontWeight="bold">
        Hello, React Atom!
      </Atom>
      <Atom fontSize="md">Build application atomically with your design!</Atom>
    </Atom>
  );
}
```

Click [here](https://codesandbox.io/s/react-atom-demo-xj9dt7?file=/src/App.tsx) to try it by yourself.

## React Atom Ecosystem 🌍

- [React Atom Tokens](https://github.com/react-earth/react-atom-tokens): build-in design tokens, such as MUI, Chakra UI, Ant Design, etc.
- [React Atom UI](https://github.com/react-earth/react-atom-ui): UI components built with React Atom, such as Button, Switch, etc.
