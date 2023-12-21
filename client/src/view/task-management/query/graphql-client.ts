import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:8000/graphql`;

export const createGraphQLClient = (sessionToken: string) => {
  return new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
};
