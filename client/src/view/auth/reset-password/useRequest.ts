import { GraphQLClient, gql } from "graphql-request";
import { useMutation } from "react-query";
import { catchHandle } from "src/core/lib/catch-helper";
import { UserVM } from "src/core/view-models/auth/user-vm";

const API_URL = `http://localhost:8000/graphql`;

export const requestNewPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({
      user,
      onSuccess,
    }: {
      user: UserVM;
      onSuccess: (isSuccess: boolean, data?: any) => void;
    }) => {
      const graphQLClient = new GraphQLClient(API_URL);
      const { email, username } = user;
      console.log('call GRAPHQL API');
      const data = await graphQLClient
        .request(
          gql`
            mutation RequestResetPassword($username: String!, $email: String!) {
              requestResetPassword(
                input: { username: $username, email: $email }
              ) {
                accessToken
                createdAt
                email
                id
                link
                password
                refreshToken
                username
              }
            }
          `,
          { username, email }
        )
        .then((res: any) => {
          console.log('res: ', res.requestResetPassword);
          onSuccess(true, res.requestResetPassword);
        })
        .catch((err) => {
          console.log('err: ', err);
          onSuccess(false);
          catchHandle(err);
        });
      return data;
    },
  });
};

export const resetPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({
      user,
      onSuccess,
    }: {
      user: UserVM;
      onSuccess: (isSuccess: boolean, data?: any) => void;
    }) => {
      const graphQLClient = new GraphQLClient(API_URL);
      const { link, password } = user;
      console.log('call GRAPHQL API');
      const data = await graphQLClient
        .request(
          gql`
            mutation ResetPassword($link: String!, $password: String!) {
              resetPassword(
                input: { encodedUsername: $link, password: $password }
              ) {
                accessToken
                createdAt
                email
                id
                link
                password
                refreshToken
                username
              }
            }
          `,
          { link, password }
        )
        .then((res: any) => {
          console.log('res: ', res.resetPassword);
          onSuccess(true, res.resetPassword);
        })
        .catch((err) => {
          console.log('err: ', err);
          onSuccess(false);
          catchHandle(err);
        });
      return data;
    },
  });
};
