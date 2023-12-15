"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSession from "src/app/use-session";
import { TaskStatusEnum } from "src/core/lib/constants";
import { TaskItemVM } from "src/core/view-models/task/task-vm";

interface ComponentProps {
  onSubmit: (task: TaskItemVM) => void;
  onCancel: () => void;
  currentTask: TaskItemVM | undefined;
}

type Props = ComponentProps;

const CreateNewTask: React.FunctionComponent<Props> = (props) => {
  const { login } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        props.onSubmit({
          createdAt: new Date().toDateString(),
          description: data.description,
          dueDate: data.dueDate,
          id: "",
          status: TaskStatusEnum.Todo,
          title: data.title,
        });
      })}
      className={"flex w-full h-full flex-col justify-between  "}
    >
      <div className={"flex flex-1 flex-col h-100"}>
        <div className={"flex gap-4"}>
          <div className="w-1/2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              title
            </label>
            <input
              {...register("title", { required: true })}
              id="title"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter title"
            />

            {errors.title && (
              <p className={"error-field"}>title is required.</p>
            )}
          </div>
          <div className="w-1/2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Due Date
            </label>
            <input
              {...register("dueDate", {
                required: "dueDate is required.",
                validate: (value) => {
                  // Kiểm tra nếu ngày nhập nhỏ hơn ngày hiện tại
                  return (
                    new Date(value) > new Date() ||
                    "Due date must be larger then current date."
                  );
                },
              })}
              id="dueDate"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập dueDate"
              type={"date"}
            />
            {errors.dueDate && (
              <p className="error-field">
                {(errors.dueDate?.message as string) || ""}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            description
          </label>
          <textarea
            {...register("description", { required: true })}
            id="description"
            className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter description"
            rows={10}
          />

          {errors.description && (
            <p className={"error-field"}>description is required.</p>
          )}
        </div>
      </div>
      <div className={"w-100 flex justify-end gap-4"}>
        <button
          onClick={props.onCancel}
          type="button"
          className={"bg-red-500 text-white py-2 px-4 rounded-lg"}
        >
          {"cancel"}
        </button>
        <button
          className={" bg-blue-400 text-white py-2 px-4 rounded-lg"}
          type="submit"
        >
          {"save"}
        </button>
      </div>
    </form>
  );
};

export default CreateNewTask;
