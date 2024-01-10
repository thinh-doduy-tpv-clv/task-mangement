import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '@/components/header';
import { Footer } from '..';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <Box w="full">{children}</Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
