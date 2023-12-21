import { useQuery } from "react-query";
import { catchHandle } from "src/core/lib/catch-helper";
import { createGraphQLClient } from "./graphql-client";
import { TaskItemVM } from "src/core/view-models/task/task-vm";
import { gql } from "graphql-request";

export const useGetTasks = (
  sessionToken: string,
  userId: number,
  logout: () => void
) => {
  return useQuery("graphql", async () => {
    if (!sessionToken) {
      return [];
    }

    const graphQLClient = createGraphQLClient(sessionToken);

    try {
      const data: any = await graphQLClient.request(
        gql`
          query GetTaskList($userId: Int!) {
            getTaskList(input: { userId: $userId }) {
              createdAt
              description
              dueDate
              id
              status
              title
            }
          }
        `,
        { userId }
      );

      return (data?.getTaskList as TaskItemVM[]) || [];
    } catch (err) {
      catchHandle(err, logout);
      return [];
    }
  });
};
