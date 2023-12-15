import { useMutation, useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { catchHandle } from "src/core/lib/catch-helper";
import { TaskItemVM } from "src/core/view-models/task/task-vm";

const API_URL = `http://localhost:8000/graphql`;

export const useGetTasks = (sessionToken: string, userId: number) => {
  return useQuery("graphql", async () => {
    const graphQLClient = new GraphQLClient(API_URL, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    const data: any = await graphQLClient
      .request(
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
      )
      .catch((err) => {
        catchHandle(err);
      });
    return (data?.getTaskList as TaskItemVM[]) || [];
  });
};

export const TaskMutation = (sessionToken: string) => {
  return useMutation({
    mutationFn: async ({
      userId,
      newTask,
      onSuccess,
    }: {
      userId: number;
      newTask: TaskItemVM;
      onSuccess: (isSuccess: boolean) => void;
    }) => {
      const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const { description, dueDate, status = "TODO", title } = newTask;

      const data = await graphQLClient
        .request(
          gql`
            mutation CreateTask(
              $description: String!
              $dueDate: DateTime!
              $status: String!
              $title: String!
              $userId: Int!
            ) {
              createTask(
                input: {
                  description: $description
                  dueDate: $dueDate
                  status: $status
                  title: $title
                  userId: $userId
                }
              ) {
                createdAt
                description
                dueDate
                id
                status
                title
              }
            }
          `,
          { description, dueDate, status, title, userId }
        )
        .then((res: any) => {
          onSuccess(true);
        })
        .catch((err) => {
          onSuccess(false);

          catchHandle(err);
        });

      return data;
    },
  });
};
