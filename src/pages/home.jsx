import React, { useState } from "react";
import {
  useGetTodoQuery,
  usePostTodoMutation,
  useTodoDeleteMutation,
} from "../redux/service/todo-api";
import { Card } from "../components/card";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loadState, saveState } from "../config/storage";
import { useGetUserQuery } from "../redux/service/user-api";

export const Home = () => {
  const { register, reset, handleSubmit } = useForm();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTodoQuery(page);

  const [postTodo] = usePostTodoMutation();
  const submit = (data) => {
    postTodo(data);

    reset();
  };

  const buttons = Array(data?.pageSize).fill(null);
  return (
    <div className="mx-auto">
      <Link to={"/users"}>User Page</Link>
      {isLoading ? (
        <h1 className="text-5xl">Loading...</h1>
      ) : (
        <div>
          <form onSubmit={handleSubmit(submit)} className="gap-5 flex mb-5 ">
            <input
              className="border outline-none p-3 items-center"
              {...register("title", { required: true })}
              type="text"
            />
            <input
              className="border outline-none p-3"
              {...register("description", { required: true })}
              type="text"
            />
            <button className="border p-2 rounded-lg ">Add</button>
          </form>
          <>
            {!data?.data.length ? (
              <h1>Ma'lumot topilmadi</h1>
            ) : (
              data?.data?.map((item) => <Card key={item.id} {...item} />)
            )}
          </>
          <div className="flex items-center gap-5 justify-center">
            {buttons?.map((_, index) => {
              let number = index + 1;
              return (
                <button
                  onClick={() => setPage(number)}
                  key={number}
                  className={`bg-slate-400 p-2 px-4 ${
                    number == page ? "bg-blue-500" : ""
                  } }`}
                >
                  {number}
                </button>
              );
              // console.log(number);
            })}
          </div>
        </div>
      )}

    </div>
  );
};
