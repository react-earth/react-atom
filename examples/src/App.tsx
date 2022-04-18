import React from 'react';
import { Atom } from './Atom';

export const App = () => {
  return (
    <Atom
      bg="gray80"
      h="heightFull"
      p="4x"
      boxSizing="border-box"
      fontFamily="default"
      fontSize="default"
      lineHeight="default"
      flex
      flexDirection="column"
      gap="3x"
    >
      <Atom fontSize="h4" c="white" fontWeight="semiBold" textAlign="center">
        Font
      </Atom>
      <Atom flex flexDirection="column" gap="1x" c="white" textAlign="center">
        <Atom fontSize="h1">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="h2">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="h3">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="h4">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="h5">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="body1">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="body2">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="body3">A JavaScript library for building user interfaces</Atom>
        <Atom fontSize="tiny">A JavaScript library for building user interfaces</Atom>
      </Atom>
      <Atom fontSize="h4" c="white" fontWeight="semiBold" textAlign="center">
        Flex Layout
      </Atom>
      <Atom flex gap="2x" w="fill">
        <Atom flexGrow="1" h="8x" c="white" bg="blue50" />
        <Atom w="8x" h="8x" c="white" bg="amber50" />
        <Atom w="8x" h="8x" c="white" bg="pink50" />
      </Atom>
      <Atom fontSize="h4" c="white" fontWeight="semiBold" textAlign="center">
        Grid Layout
      </Atom>
      <Atom grid gridColumns={4} gridRows={2} gap="2x">
        <Atom h="8x" bg="amber50" />
        <Atom gridSelfColumns={2} gridSelfRows={2} bg="blue50" />
        <Atom h="8x" bg="amber50" />
        <Atom h="8x" bg="pink50" />
        <Atom h="8x" bg="pink50" />
      </Atom>
    </Atom>
  );
};
