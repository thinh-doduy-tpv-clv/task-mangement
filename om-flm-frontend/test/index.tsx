import { MockedProvider } from "@apollo/client/testing";
import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import theme from "../src/styles/theme";

export const AllTheProviders = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const session = {
    expires: "",
    user: {
      email: "",
      image: "",
      name: "",
    },
  };

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Provider store={store}>{children}</Provider>
        </MockedProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: AllTheProviders, ...options }) as RenderResult;

export * from "@testing-library/react";
export { customRender as render };
