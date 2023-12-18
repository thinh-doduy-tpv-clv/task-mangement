"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PopupComponent from "src/components/popup.component";
import Spinner from "src/components/spinner";
import { TaskHandleMode } from "src/core/lib/constants";
import { TaskItemVM } from "src/core/view-models/task/task-vm";
import TaskFormComponent from "./components/create-task.component";
import TaskManagementComponent from "./task-management.component";
import { useGetTasks } from "./useRequest";
import { addTaskMutation, updateTaskMutation } from "./useRequest";
import useSession from "src/app/use-session";
import { defaultSession } from "src/app/task-management/lib";
import { useRouter } from "next/navigation";
import { routerPaths } from "src/core/lib/router";

interface ComponentProps {}

type Props = ComponentProps;

export type TaskObjectType = {
  [key: string]: any[];
};

type DropType = {
  index: number;
  droppableId: string;
};

const TaskManagementContainer: React.FunctionComponent<Props> = (props) => {
  const { logout, session } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState<TaskItemVM>();
  const [mode, setMode] = useState<TaskHandleMode>();

  const callback = () => {
    logout(null, {
      optimisticData: defaultSession,
    }).then(() => {
      router.push(routerPaths.signin);
    });
  };

  const { data, error, isLoading, isSuccess, refetch } = useGetTasks(
    session.token,
    +session.id,
    callback
  );
  const addTaskMutate = addTaskMutation();
  const updateTaskMutate = updateTaskMutation();
  const [tasks, setTask] = useState<TaskObjectType>({});

  useEffect(() => {
    if (!isLoading && data) {
      const dataTemp = convertData(data);
      setTask(dataTemp);
    }
  }, [data]);

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
      const sourceTask = tasks[source.droppableId][source.index];
      if (sourceTask) {
        onUpdateTask({ ...sourceTask, status: destination.droppableId });
      }
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

  const onAddNewTask = async (newTask: TaskItemVM) => {
    console.log("onAddNewTask", newTask);
    addTaskMutate.mutate({
      sessionToken: session.token,
      userId: +session.id,
      newTask,
      onSuccess: onAddTaskSuccess,
    });
  };

  const onUpdateTask = async (task: TaskItemVM) => {
    console.log("updating task info: ", task);
    updateTaskMutate.mutate({
      sessionToken: session.token,
      userId: +session.id,
      task,
      onSuccess: onUpdateTaskSuccess,
    });
  };

  const onUpdateTaskSuccess = (isSuccess: boolean) => {
    //
    if (isSuccess) {
      setShowModal(undefined);
      toast.success("Update task successfully");
    }
  };

  const onAddTaskSuccess = (isSuccess: boolean, data?: any) => {
    console.log("onAddTaskSuccess: ", isSuccess);
    if (isSuccess) {
      setShowModal(undefined);
      toast.success("New task has been created!");
      // refetch();
    }
  };

  return (
    <>
      {/* <Spinner show={isLoading} /> */}
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
        setMode={setMode}
      />
      <PopupComponent
        isVisible={!!showModal}
        onClose={() => setShowModal(undefined)}
      >
        {mode === TaskHandleMode.ADD ? (
          <TaskFormComponent
            currentTask={showModal?.id ? showModal : undefined}
            onSubmit={onAddNewTask}
            onCancel={() => setShowModal(undefined)}
          />
        ) : (
          <TaskFormComponent
            currentTask={showModal?.id ? showModal : undefined}
            onSubmit={onUpdateTask}
            onCancel={() => setShowModal(undefined)}
          />
        )}
      </PopupComponent>
    </>
  );
};

export default TaskManagementContainer;
