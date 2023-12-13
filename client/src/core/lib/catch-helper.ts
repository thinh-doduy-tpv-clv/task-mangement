import { toast } from "react-toastify";

export const catchHandle = (e: any): void => {
  const { errors, status } = e.response;

  try {
    if (status === 401) {
      // dispatch(onClearSession());
    }

    errors.forEach((item: any) => {
      if (item?.message) {
        toast.warn(item?.message);
      } else {
        toast.warn(item);
      }
    });
  } catch {
    toast.warning(e);
  }
};
