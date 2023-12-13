"use client";

import React, { useState } from "react";
import TaskManagementComponent from "./task-management.component";
import { useGetTasks } from "./useRequest";

interface ComponentProps {}

type Props = ComponentProps;

const TaskManagementContainer: React.FunctionComponent<Props> = () => {
  // const { data, error, isLoading, isSuccess } = useGetTasks();

  return <TaskManagementComponent />;
};

export default React.memo(TaskManagementContainer);
