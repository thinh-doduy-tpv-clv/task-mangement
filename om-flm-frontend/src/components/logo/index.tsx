import { Heading } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

export const Logo: React.FC = () => {
  return (
    (<NextLink href="/">

      <Heading size="lg">Next.AB</Heading>

    </NextLink>)
  );
};
