import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:8000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export const useGetTasks = () => {
  return useQuery("graphql", async () => {
    const data: any = await graphQLClient.request(gql`
      query GetTaskList {
        getTaskList {
          createdAt
          description
          dueDate
          id
          title
          status
        }
      }
    `);
    return data;
  });
};
