import { toast } from "react-toastify";

export const catchHandle = (e: any): void => {
  const { errors, status } = e.response;
  console.log("jakshfkj", e);

  try {
    if (status === 401) {
      // dispatch(onClearSession());
    }

    errors.forEach((item: any) => {
      if (item) {
        toast.warn(item.message);
      }
    });
  } catch {
    toast.warning(e);
  }
};
