"use client";

import { DraggingStyle, NotDraggingStyle } from "@hello-pangea/dnd";
import { TaskStatusEnum } from "src/core/lib/constants";

export const taskStatusData = [
  TaskStatusEnum.Todo,
  TaskStatusEnum.Inprogress,
  TaskStatusEnum.Compeleted,
  TaskStatusEnum.Archived,
];

export const MoveItem = (
  source: Iterable<unknown> | ArrayLike<unknown>,
  destination: Iterable<unknown> | ArrayLike<unknown>,
  droppableSource: { index: number; droppableId: string | number },
  droppableDestination: { index: number; droppableId: string | number }
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "#fff",
  borderWidth: "1px",
  borderColor: "#E0E0E0",
  background: "#FEFEFE",
  padding: "16px",
  ...draggableStyle,
});

export const getListStyle = (
  isDraggingOver: boolean,
  el: string
): React.CSSProperties => ({
  // background: isDraggingOver ? "rgba(130, 143, 163,0.4)" : "rgb(244, 247, 253)",
  background: "#FEFEFE",
  borderWidth: "1px",
  borderTopWidth: "4px",
  borderColor: "#E0E0E0",
  borderTopColor: getStatusColor(el),
});

export const reorder = (
  list: Iterable<unknown> | ArrayLike<unknown>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getStatusColor = (value: string) => {
  switch (value) {
    case TaskStatusEnum.Todo:
      return "#B8B9BB";
    case TaskStatusEnum.Inprogress:
      return "#EFD279";
    case TaskStatusEnum.Compeleted:
      return "#677EE6";
    case TaskStatusEnum.Archived:
      return "#E477CF";

    default:
      break;
  }
};
