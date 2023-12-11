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
): any => ({
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "#fff",
  transform: isDragging ? "rotate(180)" : "rotate(45deg)",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const grid = 12;

export const getListStyle = (isDraggingOver: boolean) => ({
  // background: isDraggingOver ? "rgba(130, 143, 163,0.4)" : "rgb(244, 247, 253)",
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
      return "rgb(73, 196, 229)";
    case TaskStatusEnum.Inprogress:
      return "rgb(132, 113, 242)";
    case TaskStatusEnum.Todo:
      return "rgb(103, 226, 174)";
    case TaskStatusEnum.Todo:
      return "red";

    default:
      break;
  }
};
