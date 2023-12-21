"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
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
import { getItemStyle, getListStyle, taskStatusData } from "./lib";
import { TaskObjectType } from "./task-management.container";
import lgo from "../../asset/lgo3.png";
import exit from "../../asset/exit.png";
import man from "../../asset/man.png";

interface ComponentProps {
  setShowModal: (task?: TaskItemVM) => void;
  tasks: TaskObjectType;
  swapped: (result: { source: any; destination: any }) => void;
  setMode: any; // TODO: need adding type for function setState
  onRemoveTask: (taskId: number) => void;
}

const TaskManagementComponent: React.FunctionComponent<ComponentProps> = (
  props
) => {
  const router = useRouter();
  const { logout } = useSession();

  const renderHeader = (): React.ReactElement => {
    return (
      <div className={"w-full flex justify-between px-8 py-4"}>
        {/* <button
          type="button"
          className={
            "px-8 py-4 justify-between items-center bg-gray-400 rounded-xl text-white font-semibold"
          }
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
        </button> */}
        {/* <img src={{}} /> */}
        <Image
          src={exit}
          alt={"exit1"}
          className="h-[3rem] w-auto hover:cursor-pointer"
          onClick={(event) => {
            event.preventDefault();
            logout(null, {
              optimisticData: defaultSession,
            }).then(() => {
              router.push(routerPaths.signin);
            });
          }}
          id={"sign-out-btn"}
        />
        <Image src={lgo} alt={""} className="h-[4rem] w-auto" />
        <Image src={man} alt={"exit"} className="h-[3rem] w-auto" />
      </div>
    );
  };

  async function onClickTaskHandler(item: TaskItemVM, mode: TaskHandleMode) {
    if (TaskHandleMode.EDIT === mode) {
      console.log(`onlick mode ${mode} - item: ${item}`);
      props.setShowModal(item);
      props.setMode(mode);
    }

    if (TaskHandleMode.DELETE === mode) {
      const confirmData = confirm(`Delete ${item.title}`);

      if (confirmData) {
        props.onRemoveTask(item.id);
      }
    }
  }

  return (
    <div
      className={"flex flex-col w-screen h-screen"}
      style={{ background: "#EBECEE" }}
    >
      {renderHeader()}
      <div className="bg-red flex-1 p-[24px] justify-center items-center flex">
        <div className="grid gap-x-8 gap-y-4 grid-cols-4 h-full w-[1600px] relative">
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
                    className="rounded-sm h-[80vh] "
                    {...provided.droppableProps}
                  >
                    <div className="w-full flex items-center py-2 font-bold justify-center flex-col text-lg">
                      {el}
                      <span className={" text-slate-500 text-sm font-light"}>
                        {`${props.tasks[el]?.length || 0} Cards`}
                      </span>
                    </div>

                    {/* <h3 className=" text-center p-2">{el}</h3> */}
                    <div className="w-100 px-2 h-[70vh] max-h-[74vh] overflow-y-scroll">
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
                                <div
                                  id={`task-name-${item.id}`}
                                  className={"text-lg font-semibold"}
                                >
                                  {item.title}
                                </div>
                                <div>{item.description}</div>
                                <div className={"w-100 flex justify-end gap-4"}>
                                  {el !== "ARCHIVED" && (
                                    <>
                                      <Image
                                        width={24}
                                        height={24}
                                        src={EditIcon}
                                        alt="Edit Task"
                                        // TODO: Edit task information
                                        onClick={() =>
                                          onClickTaskHandler(
                                            { ...item, status: el },
                                            TaskHandleMode.EDIT
                                          )
                                        }
                                        id={`edit-${item.id}`}
                                      />
                                      <Image
                                        width={24}
                                        height={24}
                                        src={RemoveIcon}
                                        alt="Remove Task"
                                        // TODO: Remove task information
                                        onClick={() =>
                                          onClickTaskHandler(
                                            item,
                                            TaskHandleMode.DELETE
                                          )
                                        }
                                        id={`remove-${item.id}`}
                                      />
                                    </>
                                  )}
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

          <div className="absolute right-[-20px] bottom-[-20px] flex justify-center items-center w-[70px] h-[70px]">
            <button
              type="button"
              onClick={() => {
                props.setShowModal();
                props.setMode(TaskHandleMode.ADD);
              }}
              className={
                "w-[60px] h-[60px] hover:w-[70px] hover:h-[70px] hover:text-7xl transition-all ease-linear opacity-75 ease hover:opacity-100 flex justify-center items-center bg-blue-600 rounded-[100px] text-6xl text-white font-semibold"
              }
              id={"add-new-task-btn"}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementComponent;
