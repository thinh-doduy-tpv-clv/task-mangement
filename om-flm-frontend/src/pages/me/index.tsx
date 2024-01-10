import MeHomePageComponent from "@/components/pages/me";
import { Box, Container, Flex } from "@chakra-ui/react";
import { NextPage, InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import HiddenMessage from "../../components/hiddenMessage";

type Props = {
  mySecret: string;
};

const MeHomePage: NextPage<Props> = ({
  mySecret,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Flex direction="column" minH="calc(100vh - 122px)">
      <Box bg="gradient" color="white" textAlign="center" py={10}>
        <Container w="500px" mb="10" fontStyle="italic">
          <MeHomePageComponent mySecret={mySecret} />
          <HiddenMessage children="HUHU" />
        </Container>
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      mySecret: process.env.TEST_SECRET || "",
    },
  };
};

export default MeHomePage;
