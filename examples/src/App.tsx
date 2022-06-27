import React from 'react';
import { Atom } from './Atom';

export const App = () => {
  return (
    <Atom
      w="fullWidth"
      h="fullHeight"
      fontFamily="default"
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
