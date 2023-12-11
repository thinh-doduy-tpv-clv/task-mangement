"use client";
import React, { useState } from "react";
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

// fake data generator
const getItems = (count: any, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));
/**
 * Moves an item from one list to another list.
 */

const TaskManagementComponent = () => {
  const [state, setState] = useState<any>({});
  console.log("state", state);

  function onDragEnd(result: { source: any; destination: any }) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState: any = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = MoveItem(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div className={"flex flex-col w-screen h-screen"}>
      <button
        type="button"
        onClick={() => {
          setState((prev: any) => ({
            ...prev,
            [TaskStatusEnum.Todo]: [
              ...getItems(1),
              ...(prev[TaskStatusEnum.Todo] || []),
            ],
          }));
        }}
      >
        Add new item
      </button>
      <button
        type="button"
        onClick={() => {
          setState((prev: any) => ({
            ...prev,
            [TaskStatusEnum.Inprogress]: [
              ...getItems(1),
              ...(prev[TaskStatusEnum.Inprogress] || []),
            ],
          }));
        }}
      >
        Add new item
      </button>
      <div className="bg-red flex-1 p-[24px] justify-center items-center flex">
        <div className="grid gap-x-8 gap-y-4 grid-cols-4 h-full w-[1600px]">
          <DragDropContext
            onDragEnd={() => {
              // onDragEnd
            }}
          >
            {taskStatusData.map((el, ind) => (
              <Droppable key={el} droppableId={`${el}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="px-2 rounded-sm"
                    {...provided.droppableProps}
                  >
                    <div
                      className="w-full flex items-center py-2 font-bold "
                      style={{ color: "rgb(130, 143, 163)" }}
                    >
                      <div
                        className=" w-4 h-4 rounded-2xl bg-slate-900 mr-4"
                        style={{
                          backgroundColor: getStatusColor(el),
                        }}
                      />
                      {el}
                    </div>

                    {/* <h3 className=" text-center p-2">{el}</h3> */}
                    {(state[el] || []).map((item: any, index: number) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
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
                            className="rounded-sm py-4 px-2 mt-2 box"
                          >
                            <div>{item.content}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
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
