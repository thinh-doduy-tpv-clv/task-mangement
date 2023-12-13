"use client";

import React, { useEffect, useState } from "react";

interface ComponentProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

type Props = ComponentProps;

const Popup: React.FunctionComponent<Props> = (props) => {
  // const { data, error, isLoading, isSuccess } = useGetTasks();

  useEffect(() => {
    if (props.isVisible) {
      document.body.className =
        document.body.className + " overflow-hidden relative";
    } else {
      document.body.className = document.body.className.replace(
        "overflow-hidden relative",
        ""
      );
    }

    return () => {
      document.body.className = document.body.className.replace(
        "overflow-hidden relative",
        ""
      );
    };
  }, [props.isVisible]);

  const onClickOutside = (e: any) => {
    if (e.target?.id && e.target?.id === "popup-container") {
      return;
    }
    // close popup

    props.onClose();
  };

  if (!props.isVisible) {
    return undefined;
  }

  return (
    <div
      className={
        "absolute w-screen h-screen bg-slate-400 top-0 left-0 bg-opacity-40 flex justify-center items-center z-10"
      }
      onClick={onClickOutside}
    >
      {/* box  */}
      <div
        id={"popup-container"}
        className={"w-1/2 h-2/3 bg-white rounded-lg p-4 z-20"}
      >
        <div className={"opacity-100"}>This is header</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default React.memo(Popup);
