import { toast } from "react-toastify";

export const catchHandle = (e: any, callback?: () => void): void => {
  const { errors, status } = e.response;
  console.log("item", errors);

  try {
    errors.forEach((item: any) => {
      if (item?.statusCode === 403) {
        if (callback) {
          toast.warn(item?.message);
          return callback();
        }
      }

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
