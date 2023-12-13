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
      onSuccess: (username: string, token: string) => void;
    }) => {
      const data = await graphQLClient
        .request(
          gql`
            mutation Login($username: String!, $password: String!) {
              login(input: { password: $password, username: $username }) {
                accessToken
                username
              }
            }
          `,
          { password, username }
        )
        .then((res: any) => {
          onSuccess(username, res?.login?.accessToken || "");
        })
        .catch((err) => {
          catchHandle(err);

          return undefined;
        });

      return data;
    },
  });
};
