"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "@hello-pangea/dnd";
import {
  MoveItem,
  getItemStyle,
  getListStyle,
  getStatusColor,
  reorder,
  taskStatusData,
} from "./lib";
import { TaskStatusEnum } from "src/core/lib/constants";
import useSession from "src/app/use-session";
import { defaultSession } from "src/app/task-management/lib";
import { useRouter } from "next/navigation";
import { TaskItemVM } from "src/core/view-models/task/task-vm";
import Image from "next/image";
import EditIcon from "src/asset/edit.png";
import RemoveIcon from "src/asset/remove.png";
import { routerPaths } from "src/core/lib/router";
import { TaskObjectType } from "./task-management.container";

interface ComponentProps {
  setShowModal: (task?: TaskItemVM) => void;
  tasks: TaskObjectType;
  swapped: (result: { source: any; destination: any }) => void;
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
          onClick={() => props.setShowModal()}
          className={
            "px-8 py-4 flex justify-center items-center bg-blue-600 rounded-xl text-white font-semibold"
          }
        >
          Add new item
        </button>
      </div>
    );
  };

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
                                    onClick={() => props.setShowModal(item)}
                                  />
                                  <Image
                                    width={24}
                                    height={24}
                                    src={RemoveIcon}
                                    alt="Remove Task"
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
