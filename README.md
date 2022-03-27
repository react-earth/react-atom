# React Atom

> Build your application atomic with your design!

## Install

Using npm:

```sh
npm install @react-atom/atom

# base on styled-components
npm install @react-atom/atom-styled-components

# base on emotion
npm install @react-atom/atom-emotion
```

or using yarn:

```sh
yarn add @react-atom/atom

# base on styled-components
yarn add @react-atom/atom-styled-components

# base on emotion
yarn add @react-atom/atom-emotion
```

## Use official tokens (optional)

Using npm:

```sh
npm install @react-atom/tokens
```

or using yarn:

```sh
yarn add @react-atom/tokens
```

## Usage

Create you Atom component

```typescript
import atom from '@react-atom/atom';

// base on styled-components
import atom from '@react-atom/atom-styled-components';

// base on emotion
import atom from '@react-atom/atom-emotion';

// official token
import tokens from '@react-atom/tokens';

const Atom = atom(tokens);

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
  <Atom fontFamily="sans">
    <Atom flex={{gap: '1x'}}>
      <Atom w="8x" h="8x" bg="red50"/>
      <Atom w="8x" h="8x" bg="green50"/>
      <Atom w="8x" h="8x" bg="blue50"/>
    <Atom>
  <Atom>
}
```