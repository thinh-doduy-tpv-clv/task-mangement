import React, { useState } from "react";
import TaskManagementComponent from "./task-management.component";

interface ComponentProps {
  user?: any;
}

type Props = ComponentProps;

const TaskManagementContainer: React.FunctionComponent<Props> = () => {
  return <TaskManagementComponent />;
};

export default TaskManagementContainer;
