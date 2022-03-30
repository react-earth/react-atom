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
      p="2x"
      boxSizing="border-box"
      flex={{ direction: 'column', gap: '3x' }}
    >
      <Atom>
        <Atom fontSize="3xl" c="white" fontWeight="semiBold" textAlign="center">
          Flex layout
        </Atom>
        <Atom mt="2x" flex={{ direction: 'row', gap: '1x' }}>
          <Atom flexItem={{ grow: 1 }} p="3x" c="white" bg="blue50" boxSizing="border-box" textAlign="center">
            atom
          </Atom>
          <AtomStyledComponents p="3x" c="white" bg="amber50" boxSizing="border-box" textAlign="center">
            atom-styled-components
          </AtomStyledComponents>
          <AtomEmotion p="3x" c="white" bg="pink50" boxSizing="border-box" textAlign="center">
            atom-emotion
          </AtomEmotion>
        </Atom>
      </Atom>
      <Atom>
        <Atom fontSize="3xl" c="white" fontWeight="semiBold" textAlign="center">
          Grid layout
        </Atom>
        <Atom mt="2x" grid={{ columns: 4, gap: '1x' }}>
          <AtomStyledComponents p="3x" c="white" bg="amber50" boxSizing="border-box" textAlign="center">
            atom-styled-components
          </AtomStyledComponents>
          <Atom p="3x" gridItem={{ span: 2, rows: 2 }} c="white" bg="blue50" boxSizing="border-box">
            <Atom flex={{ justify: 'center', align: 'center' }} w="fill" h="fill">
              atom
            </Atom>
          </Atom>
          <AtomStyledComponents p="3x" c="white" bg="amber50" boxSizing="border-box" textAlign="center">
            atom-styled-components
          </AtomStyledComponents>
          <AtomEmotion p="3x" c="white" bg="pink50" boxSizing="border-box" textAlign="center">
            atom-emotion
          </AtomEmotion>
          <AtomEmotion p="3x" c="white" bg="pink50" boxSizing="border-box" textAlign="center">
            atom-emotion
          </AtomEmotion>
        </Atom>
      </Atom>
      <Atom>
        <Atom fontSize="3xl" c="white" fontWeight="semiBold" textAlign="center">
          Pseudo classes
        </Atom>
        <Atom mt="2x" flex={{ direction: 'row', gap: '1x' }}>
          <Atom
            as="form"
            bg="gray90"
            flex={{ direction: 'column', gap: '1x' }}
            flexItem={{ grow: 1 }}
            p="2x"
            boxSizing="border-box"
          >
            <Atom c="white" focusWithin={{ c: 'yellow50' }} flex={{ direction: 'column', gap: '1x' }}>
              <Atom textAlign="center">atom</Atom>
              <Atom as="input" mt="1x" placeholder="username" p="1x" focus={{ bg: 'yellow50' }} />
              <Atom as="input" placeholder="email" p="1x" focus={{ bg: 'yellow50' }} />
            </Atom>

            <Atom
              textAlign="center"
              py="1x"
              c="white"
              bg="gray50"
              cursor="pointer"
              hover={{ bg: 'blue50' }}
              active={{ bg: 'blue60' }}
            >
              submit
            </Atom>
          </Atom>
          <AtomStyledComponents
            as="form"
            bg="gray90"
            flex={{ direction: 'column', gap: '1x' }}
            flexItem={{ grow: 1 }}
            p="2x"
            boxSizing="border-box"
          >
            <AtomStyledComponents c="white" focusWithin={{ c: 'yellow50' }} flex={{ direction: 'column', gap: '1x' }}>
              <AtomStyledComponents textAlign="center">atom-styled-components</AtomStyledComponents>
              <AtomStyledComponents as="input" mt="1x" placeholder="username" p="1x" focus={{ bg: 'yellow50' }} />
              <AtomStyledComponents as="input" placeholder="email" p="1x" focus={{ bg: 'yellow50' }} />
            </AtomStyledComponents>
            <AtomStyledComponents
              textAlign="center"
              py="1x"
              c="white"
              bg="gray50"
              cursor="pointer"
              hover={{ bg: 'blue50' }}
              active={{ bg: 'blue60' }}
            >
              submit
            </AtomStyledComponents>
          </AtomStyledComponents>
          <AtomEmotion
            as="form"
            bg="gray90"
            flex={{ direction: 'column', gap: '1x' }}
            flexItem={{ grow: 1 }}
            p="2x"
            boxSizing="border-box"
          >
            <AtomEmotion c="white" focusWithin={{ c: 'yellow50' }} flex={{ direction: 'column', gap: '1x' }}>
              <AtomEmotion textAlign="center">atom-emotion</AtomEmotion>
              <AtomEmotion as="input" mt="1x" placeholder="username" p="1x" focus={{ bg: 'yellow50' }} />
              <AtomEmotion as="input" placeholder="email" p="1x" focus={{ bg: 'yellow50' }} />
            </AtomEmotion>
            <AtomEmotion
              textAlign="center"
              py="1x"
              c="white"
              bg="gray50"
              cursor="pointer"
              hover={{ bg: 'blue50' }}
              active={{ bg: 'blue60' }}
            >
              submit
            </AtomEmotion>
          </AtomEmotion>
        </Atom>
      </Atom>
    </Atom>
  );
};
