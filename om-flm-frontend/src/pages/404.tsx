import ErrorPageComponent from "@/components/pages/error";
import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <div>
        <Heading></Heading>
      </div>
      <Head>
        <title>Page Not Found</title>
      </Head>
      {<div>{<ErrorPageComponent statusCode={404} />}</div>}
    </>
  );
};

export default NotFoundPage;
