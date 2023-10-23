# React Atom

> Next generation atomization framework, build application atomic with you design ❤

## Packages

| Package                         | Version                                                                |
| ------------------------------- | ---------------------------------------------------------------------- |
| `@react-atom/styled-components` | ![version](https://img.shields.io/npm/v/@react-atom/styled-components) |
| `@react-atom/emotion`           | ![version](https://img.shields.io/npm/v/@react-atom/emotion)           |

## Install

```sh
# base on styled-components
npm install @react-atom/styled-components

# base on emotion
npm install @react-atom/emotion
```

## Usage

Create you Atom component

```typescript
// base on react build-in style
import atom from '@react-atom/style';

// base on styled-components
import atom from '@react-atom/styled-components';

// base on emotion
import atom from '@react-atom/emotion';

// use you custom tokens
const Atom = atom({
  fontFamily: {
    // ...
  },
  fontSize: {
    // ...
  },
  color: {
    // ...
  },
  spacing: {
    // ...
  },
  // ...
});
```

Build you application atomic!

```typescript
const App = () => {
  <Atom flex gap="1x">
    <Atom w="8x" h="8x" bg="red50"/>
    <Atom w="8x" h="8x" bg="green50"/>
    <Atom w="8x" h="8x" bg="blue50"/>
  <Atom>
}
```
