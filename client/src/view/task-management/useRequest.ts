import { GraphQLClient, gql } from "graphql-request";
import { useMutation, useQuery } from "react-query";
import { catchHandle } from "src/core/lib/catch-helper";
import { TaskItemVM } from "src/core/view-models/task/task-vm";

const API_URL = `http://localhost:8000/graphql`;

export const useGetTasks = (
  sessionToken: string,
  userId: number,
  logout: () => void
) => {
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
        catchHandle(err, logout);
      });
    return (data?.getTaskList as TaskItemVM[]) || [];
  });
};

export const addTaskMutation = () => {
  return useMutation({
    mutationFn: async ({
      sessionToken,
      userId,
      newTask,
      onSuccess,
    }: {
      sessionToken: string;
      userId: number;
      newTask: TaskItemVM;
      onSuccess: (isSuccess: boolean, data?: any) => void;
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
          console.log("added success");
          onSuccess(true, null);
        })
        .catch((err) => {
          onSuccess(false);
          catchHandle(err);
        });
      return data;
    },
  });
};

export const updateTaskMutation = () => {
  return useMutation({
    mutationFn: async ({
      sessionToken,
      userId,
      task,
      onSuccess,
    }: {
      sessionToken: string;
      userId: number;
      task: TaskItemVM;
      onSuccess: (isSuccess: boolean) => void;
    }) => {
      const graphQLClient = new GraphQLClient(API_URL, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      const { description, dueDate, status, title, id } = task;
      const data = await graphQLClient
        .request(
          gql`
            mutation UpdateTask(
              $description: String!
              $dueDate: DateTime!
              $status: String!
              $title: String!
              $userId: Int!
              $id: Int!
            ) {
              updateTask(
                input: {
                  description: $description
                  dueDate: $dueDate
                  status: $status
                  title: $title
                  userId: $userId
                  taskId: $id
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
          { description, dueDate, status, title, userId, id }
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
