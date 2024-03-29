import { useMutation, useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { catchHandle } from "src/core/lib/catch-helper";

const API_URL = `http://localhost:8000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  // headers: {
  //   Authorization: `Bearer ${process.env.API_KEY}`,
  // },
});

export const SignInMutation = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      onSuccess,
    }: {
      username: string;
      password: string;
      onSuccess: (username: string, token: string, id: string) => void;
    }) => {
      const data = await graphQLClient
        .request(
          gql`
            mutation Login($username: String!, $password: String!) {
              login(input: { password: $password, username: $username }) {
                accessToken
                username
                id
              }
            }
          `,
          { password, username }
        )
        .then((res: any) => {
          onSuccess(username, res?.login?.accessToken || "", res?.login?.id);
        })
        .catch((err) => {
          catchHandle(err);

          return undefined;
        });

      return data;
    },
  });
};

export const RegisterMutation = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      email,
      onSuccess,
    }: {
      username: string;
      password: string;
      email: string;
      onSuccess: () => void;
    }) => {
      const data = await graphQLClient
        .request(
          gql`
            mutation Register(
              $username: String!
              $password: String!
              $email: String!
            ) {
              register(
                input: {
                  email: $email
                  password: $password
                  username: $username
                }
              ) {
                id
              }
            }
          `,
          { password, username, email }
        )
        .then((res: any) => {
          onSuccess();
        })
        .catch((err) => {
          catchHandle(err);

          return undefined;
        });

      return data;
    },
  });
};
