"use client";
import {
  DragDropContext,
  Draggable,
  Droppable
} from "@hello-pangea/dnd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { defaultSession } from "src/app/task-management/lib";
import useSession from "src/app/use-session";
import EditIcon from "src/asset/edit.png";
import RemoveIcon from "src/asset/remove.png";
import { TaskHandleMode } from "src/core/lib/constants";
import { routerPaths } from "src/core/lib/router";
import { TaskItemVM } from "src/core/view-models/task/task-vm";
import {
  getItemStyle,
  getListStyle,
  taskStatusData
} from "./lib";
import { TaskObjectType } from "./task-management.container";

interface ComponentProps {
  setShowModal: (task?: TaskItemVM) => void;
  tasks: TaskObjectType;
  swapped: (result: { source: any; destination: any }) => void;
  setMode: any; // TODO: need adding type for function setState
}

const TaskManagementComponent: React.FunctionComponent<ComponentProps> = (
  props
) => {
  const router = useRouter();
  const { logout } = useSession();

  const renderHeader = (): React.ReactElement => {
    return (
      <div className={"w-full flex justify-between px-8 py-4"}>
        <button
          type="button"
          className={"px-8 py-4 justify-between items-center bg-gray-400 rounded-xl text-white font-semibold"}
          onClick={(event) => {
            event.preventDefault();
            logout(null, {
              optimisticData: defaultSession,
            }).then(() => {
              router.push(routerPaths.signin);
            });
          }}
        >
          logout
        </button>
        <button
          type="button"
          onClick={() => {
            props.setShowModal();
            props.setMode(TaskHandleMode.ADD);
          }}
          className={
            "px-8 py-4 flex justify-center items-center bg-blue-600 rounded-xl text-white font-semibold"
          }
        >
          Add new item
        </button>
      </div>
    );
  };

  function onClickTaskHandler(item: TaskItemVM, mode: TaskHandleMode) {
    console.log(`onlick mode ${mode} - item: ${item}`)
    props.setShowModal(item)
    props.setMode(mode);
  }

  return (
    <div
      className={"flex flex-col w-screen h-screen"}
      style={{ background: "#EBECEE" }}
    >
      {renderHeader()}
      <div className="bg-red flex-1 p-[24px] justify-center items-center flex">
        <div className="grid gap-x-8 gap-y-4 grid-cols-4 h-full w-[1600px]">
          <DragDropContext onDragEnd={props.swapped}>
            {taskStatusData.map((el, ind) => (
              <Droppable key={el} droppableId={`${el}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, el)}
                    onLoad={(e) => {
                      // console.log(e.target);
                    }}
                    className="px-2 rounded-sm"
                    {...provided.droppableProps}
                  >
                    <div className="w-full flex items-center py-2 font-bold justify-center flex-col text-lg">
                      {el}
                      <span className={" text-slate-500 text-sm font-light"}>
                        {"5 Cards"}
                      </span>
                    </div>

                    {/* <h3 className=" text-center p-2">{el}</h3> */}
                    <div className="w-100 h-100">
                      {(props.tasks[el] || []).map(
                        (item: any, index: number) => (
                          <Draggable
                            key={item.id?.toString()}
                            draggableId={item.id?.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className="rounded-sm py-4 px-2 mt-2"
                              >
                                <div className={"text-lg font-semibold"}>
                                  {item.title}
                                </div>
                                <div>{item.description}</div>
                                <div className={"w-100 flex justify-end gap-4"}>
                                  <Image
                                    width={24}
                                    height={24}
                                    src={EditIcon}
                                    alt="Edit Task"
                                    // TODO: Edit task information
                                    onClick={() => onClickTaskHandler(item, TaskHandleMode.EDIT)}
                                  />
                                  <Image
                                    width={24}
                                    height={24}
                                    src={RemoveIcon}
                                    alt="Remove Task"
                                    // TODO: Remove task information
                                    onClick={() => onClickTaskHandler(item, TaskHandleMode.DELETE)}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementComponent;
