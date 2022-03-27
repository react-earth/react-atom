import React from 'react';
import { Atom } from './components/Atom';
import { AtomEmotion } from './components/AtomEmotion';
import { AtomStyledComponents } from './components/AtomStyledComponents';

export const App = () => {
  return (
    <Atom
      bg="gray80"
      h="heightFull"
      fontFamily="sans"
      fontWeight="semiBold"
      p="1x"
      flex={{ direction: 'column', justify: 'center' }}
    >
      <Atom flex={{ direction: 'row', gap: '1x' }}>
        {new Array(5).fill(0).map((_, index) => (
          <Atom
            key={index}
            w="fill"
            p="3x"
            c="white"
            bg="blue50"
            boxSizing="border-box"
            textAlign="center"
            as="section"
          >
            atom
          </Atom>
        ))}
      </Atom>
      <AtomStyledComponents mt="1x" flex={{ direction: 'row', gap: '1x' }}>
        {new Array(5).fill(0).map((_, index) => (
          <AtomStyledComponents
            key={index}
            w="fill"
            p="3x"
            c="white"
            bg="amber50"
            boxSizing="border-box"
            textAlign="center"
            as="section"
          >
            atom-styled-components
          </AtomStyledComponents>
        ))}
      </AtomStyledComponents>
      <AtomEmotion mt="1x" flex={{ direction: 'row', gap: '1x' }}>
        {new Array(5).fill(0).map((_, index) => (
          <AtomEmotion
            key={index}
            w="fill"
            p="3x"
            c="white"
            bg="pink50"
            boxSizing="border-box"
            textAlign="center"
            as="section"
          >
            atom-emotion
          </AtomEmotion>
        ))}
      </AtomEmotion>
    </Atom>
  );
};
