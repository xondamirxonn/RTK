import React, { useState } from "react";
import {
  useGetUserQuery,
  usePostUserMutation,
} from "../redux/service/user-api";
import { useForm } from "react-hook-form";
import { UsersCard } from "../components/users-card";
import { saveState } from "../config/storage";


export const Users = () => {
  const { reset, register, handleSubmit } = useForm();
  const [userPost] = usePostUserMutation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUserQuery(page);
  // const {data, isLoading} = useGetUserQuery()
  // console.log(data);
  const submit = (data) => {
    userPost(data);
    console.log(data);
    reset();
  };
  const pagenition = Array(data?.pageSize).fill(null);
  return (
    <div>
      <form
        className="flex items-center gap-5 px-5 mt-5 "
        onSubmit={handleSubmit(submit)}
      >
        <input
          className="p-3 border rounded-lg border-black outline-none"
          {...register("name", { required: true })}
          type="text"
        />
        <input
          className="p-3 border rounded-lg border-black outline-none"
          {...register("lastName", { required: true })}
          type="text"
        />

        <input
          className="p-3 border rounded-lg border-black outline-none"
          {...register("description", { required: true })}
        ></input>
        <button type="submit" className="border p-3 border-black">
          Add
        </button>
      </form>

      {isLoading ? (
        <h1 className="text-5xl">Loading...</h1>
      ) : (
        <>
          {!data?.data?.length ? (
            <h1 className="text-center text-5xl mt-52">Ma'lumot topilmadi</h1>
          ) : (
            data?.data.map((item) => <UsersCard key={item.id} {...item} />)
          )}
        </>
      )}

      <div className="flex items-center gap-5 justify-center mt-10">
        {pagenition?.map((_, index) => {
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
        })}
      </div>
    </div>
  );
};
