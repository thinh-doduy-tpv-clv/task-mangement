"use client";

import React, { useEffect, useState } from "react";
import TaskManagementComponent from "./task-management.component";
import { TaskMutation, useGetTasks } from "./useRequest";
import PopupComponent from "src/components/popup.component";
import CreateNewTask from "./components/create-task.component";
import { TaskItemVM } from "src/core/view-models/task/task-vm";
import { toast } from "react-toastify";
import Spinner from "src/components/spinner";

interface ComponentProps {
  token: string;
  userId: string;
}

type Props = ComponentProps;

export type TaskObjectType = {
  [key: string]: any[];
};

type DropType = {
  index: number;
  droppableId: string;
};

const TaskManagementContainer: React.FunctionComponent<Props> = (props) => {
  const [showModal, setShowModal] = useState<TaskItemVM | undefined>(undefined);
  const { data, error, isLoading, isSuccess } = useGetTasks(
    props.token,
    +props.userId
  );
  const mutation = TaskMutation(props.token);
  const [tasks, setTask] = useState<TaskObjectType>({});

  useEffect(() => {
    if (!isLoading && data) {
      const dataTemp = convertData(data);
      setTask(dataTemp);
    }
  }, [isLoading, data]);

  const convertData = (taskData: TaskItemVM[]) => {
    const groupedTasks = taskData.reduce((acc: TaskObjectType, task) => {
      const { status, ...rest } = task;

      if (!acc[status]) {
        acc[status] = [];
      }

      acc[status].push(rest);

      return acc;
    }, {});

    return groupedTasks;
  };

  const swapped = (result: { source: DropType; destination: DropType }) => {
    const { source, destination } = result;

    if (!destination || !source) {
      return;
    }

    if (source.droppableId === destination?.droppableId) {
      // current swap
      setTask((prev) => ({
        ...prev,
        [destination.droppableId]: moveItemToIndex(
          prev[destination.droppableId],
          source.index,
          destination.index
        ),
      }));
    } else {
      // column swapped
      setTask((prev) => ({
        ...prev,
        [destination.droppableId]: insertItemAt(
          prev[destination.droppableId] || [],
          prev[source.droppableId][source.index],
          destination.index
        ),
        [source.droppableId]: prev[source.droppableId].filter(
          (_item, index) => {
            return index !== source.index;
          }
        ),
      }));
    }
  };

  function moveItemToIndex<T>(
    arr: T[],
    fromIndex: number,
    toIndex: number
  ): T[] {
    const newArr = [...arr];
    const [removedItem] = newArr.splice(fromIndex, 1);
    if (fromIndex > -1) {
      newArr.splice(toIndex, 0, removedItem);
    }
    return newArr;
  }

  function insertItemAt<T>(arr: T[], item: T, index: number): T[] {
    const newArr = [...arr];
    newArr.splice(index, 0, item);
    return newArr;
  }

  const onAddNewTask = (newTask: TaskItemVM) => {
    mutation.mutate({
      userId: +props.userId,
      newTask,
      onSuccess: onAddTaskSuccess,
    });
  };

  const onAddTaskSuccess = (isSuccess: boolean) => {
    //
    if (isSuccess) {
      setShowModal(undefined);
      toast.success("New task has been created!");
    }
  };

  if (error) {
    return undefined;
  }

  return (
    <>
      <Spinner show={isLoading} />
      <TaskManagementComponent
        setShowModal={(currentTask?: TaskItemVM) => {
          if (currentTask) {
            setShowModal(currentTask);
          } else {
            setShowModal(new TaskItemVM());
          }
        }}
        tasks={tasks}
        swapped={swapped}
      />
      <PopupComponent
        isVisible={!!showModal}
        onClose={() => setShowModal(undefined)}
      >
        <CreateNewTask
          currentTask={showModal?.id ? showModal : undefined}
          onSubmit={onAddNewTask}
          onCancel={() => setShowModal(undefined)}
        />
      </PopupComponent>
    </>
  );
};

export default React.memo(TaskManagementContainer);
