"use client";

import React, { useState } from "react";
import TaskManagementComponent from "./task-management.component";
import { useGetTasks } from "./useRequest";
import PopupComponent from "src/components/popup.component";

interface ComponentProps {}

type Props = ComponentProps;

const TaskManagementContainer: React.FunctionComponent<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const { data, error, isLoading, isSuccess } = useGetTasks();

  return (
    <>
      <TaskManagementComponent />
      <PopupComponent isVisible={showModal} onClose={() => setShowModal(false)}>
        <div />
      </PopupComponent>
    </>
  );
};

export default React.memo(TaskManagementContainer);
