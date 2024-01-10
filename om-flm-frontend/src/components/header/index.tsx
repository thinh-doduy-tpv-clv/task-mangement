import { Box, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Logo } from '../logo';
import { NavBar } from '../navbar';

export const Header: React.FC = () => {
  return (
    <Box h="58" bg="headerBg" display="flex" px="10" alignItems="center">
      <Box>
        <Logo />
      </Box>
      <Box ml="10">
      </Box>
      <NavBar />
      <Spacer />
    </Box>
  );
};
