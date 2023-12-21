import { gql } from "graphql-request";
import { catchHandle } from "src/core/lib/catch-helper";
import { UserVM } from "src/core/view-models/auth/user-vm";
import { TaskItemVM } from "src/core/view-models/task/task-vm";
import { createGraphQLClient } from "./graphql-client";
import { executeMutation } from "./utils";
import { useMutation } from "react-query";

export const addTaskMutation = () => {
  return useMutation(
    async ({
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
      if (!sessionToken) {
        return;
      }

      const graphQLClient = createGraphQLClient(sessionToken);

      const { description, dueDate, status = "TODO", title } = newTask;
      const variables = { description, dueDate, status, title, userId };

      await executeMutation(
        graphQLClient.request.bind(graphQLClient),
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
        variables,
        onSuccess,
        () => onSuccess(false)
      );
    }
  );
};

export const updateTaskMutation = () => {
  return useMutation(
    async ({
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
      const graphQLClient = createGraphQLClient(sessionToken);

      const { description, dueDate, status, title, id } = task;
      const variables = { description, dueDate, status, title, userId, id };

      await executeMutation(
        graphQLClient.request.bind(graphQLClient),
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
        variables,
        onSuccess,
        () => onSuccess(false)
      );
    }
  );
};

export const requestNewPasswordMutation = () => {
  return useMutation(
    async ({
      sessionToken,
      user,
      onSuccess,
    }: {
      sessionToken: string;
      user: UserVM;
      onSuccess: (isSuccess: boolean) => void;
    }) => {
      const graphQLClient = createGraphQLClient(sessionToken);

      const { email, username } = user;
      const variables = { username, email };

      await executeMutation(
        graphQLClient.request.bind(graphQLClient),
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
        variables,
        onSuccess,
        () => onSuccess(false)
      );
    }
  );
};
