import React from 'react';
import { AtomStyle } from './components/AtomStyle';
import { AtomEmotion } from './components/AtomEmotion';
import { AtomStyledComponents } from './components/AtomStyledComponents';

export const App = () => {
  return (
    <AtomStyle
      bg="gray80"
      h="heightFull"
      fontFamily="sans"
      fontWeight="semiBold"
      p="2x"
      boxSizing="border-box"
      flex={{ direction: 'column', gap: '3x' }}
    >
      <AtomStyle>
        <AtomStyle fontSize="3xl" c="white" fontWeight="semiBold" textAlign="center">
          Flex layout
        </AtomStyle>
        <AtomStyle mt="2x" flex={{ direction: 'row', gap: '1x' }}>
          <AtomStyle flexItem={{ grow: 1 }} p="3x" c="white" bg="blue50" boxSizing="border-box" textAlign="center">
            AtomStyle
          </AtomStyle>
          <AtomStyledComponents p="3x" c="white" bg="amber50" boxSizing="border-box" textAlign="center">
            AtomStyle-styled-components
          </AtomStyledComponents>
          <AtomEmotion p="3x" c="white" bg="pink50" boxSizing="border-box" textAlign="center">
            AtomStyle-emotion
          </AtomEmotion>
        </AtomStyle>
      </AtomStyle>
      <AtomStyle>
        <AtomStyle fontSize="3xl" c="white" fontWeight="semiBold" textAlign="center">
          Grid layout
        </AtomStyle>
        <AtomStyle mt="2x" grid={{ columns: 4, gap: '1x' }}>
          <AtomStyledComponents p="3x" c="white" bg="amber50" boxSizing="border-box" textAlign="center">
            AtomStyle-styled-components
          </AtomStyledComponents>
          <AtomStyle p="3x" gridItem={{ span: 2, rows: 2 }} c="white" bg="blue50" boxSizing="border-box">
            <AtomStyle flex={{ justify: 'center', align: 'center' }} w="fill" h="fill">
              AtomStyle
            </AtomStyle>
          </AtomStyle>
          <AtomStyledComponents p="3x" c="white" bg="amber50" boxSizing="border-box" textAlign="center">
            AtomStyle-styled-components
          </AtomStyledComponents>
          <AtomEmotion p="3x" c="white" bg="pink50" boxSizing="border-box" textAlign="center">
            AtomStyle-emotion
          </AtomEmotion>
          <AtomEmotion p="3x" c="white" bg="pink50" boxSizing="border-box" textAlign="center">
            AtomStyle-emotion
          </AtomEmotion>
        </AtomStyle>
      </AtomStyle>
      <AtomStyle>
        <AtomStyle fontSize="3xl" c="white" fontWeight="semiBold" textAlign="center">
          Pseudo classes
        </AtomStyle>
        <AtomStyle mt="2x" flex={{ direction: 'row', gap: '1x' }}>
          <AtomStyle
            as="form"
            bg="gray90"
            flex={{ direction: 'column', gap: '1x' }}
            flexItem={{ grow: 1 }}
            p="2x"
            boxSizing="border-box"
          >
            <AtomStyle c="white" focusWithin={{ c: 'yellow50' }} flex={{ direction: 'column', gap: '1x' }}>
              <AtomStyle textAlign="center">AtomStyle</AtomStyle>
              <AtomStyle as="input" mt="1x" placeholder="username" p="1x" focus={{ bg: 'yellow50' }} />
              <AtomStyle as="input" placeholder="email" p="1x" focus={{ bg: 'yellow50' }} />
            </AtomStyle>

            <AtomStyle
              textAlign="center"
              py="1x"
              c="white"
              bg="gray50"
              cursor="pointer"
              hover={{ bg: 'blue50' }}
              active={{ bg: 'blue60' }}
            >
              submit
            </AtomStyle>
          </AtomStyle>
          <AtomStyledComponents
            as="form"
            bg="gray90"
            flex={{ direction: 'column', gap: '1x' }}
            flexItem={{ grow: 1 }}
            p="2x"
            boxSizing="border-box"
          >
            <AtomStyledComponents c="white" focusWithin={{ c: 'yellow50' }} flex={{ direction: 'column', gap: '1x' }}>
              <AtomStyledComponents textAlign="center">AtomStyle-styled-components</AtomStyledComponents>
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
              <AtomEmotion textAlign="center">AtomStyle-emotion</AtomEmotion>
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
        </AtomStyle>
      </AtomStyle>
    </AtomStyle>
  );
};
