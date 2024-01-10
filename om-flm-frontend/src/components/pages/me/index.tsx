import Head from 'next/head';
import React, { useEffect, useState } from 'react';

interface MyComponentProps {
  mySecret: string
}

const MeHomePageComponent: React.FC<MyComponentProps> = ({mySecret}) => {
  const [secret, setSecret] = useState('');
  useEffect(() => {
    setSecret(mySecret || 'no secret');
  }, [mySecret]);

  return (
    <>
      <Head>
        <title>Me Page</title>
      </Head>
      <div>Me home page component {secret}</div>
    </>
  );
};

export default MeHomePageComponent;
