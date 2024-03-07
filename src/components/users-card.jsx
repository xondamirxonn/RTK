import React from "react";
import { Link } from "react-router-dom";
import {
  useGetUserQuery,
  useUserDeleteMutation,
} from "../redux/service/user-api";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/service/user-reducer";
import { loadState, saveState } from "../config/storage";

export const UsersCard = ({ name, lastName, id }) => {
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state);
  const [userDelete] = useUserDeleteMutation();
  const { data } = useGetUserQuery();
  

  const AddUser = (id) => {
    let res = data?.data?.find((item) => item.id === id);
    saveState("user", data.data );
    dispatch(add({ res }));
    loadState("user");
  };


  return (
    <div className="flex items-center justify-between relative">
      <Link to={`/user/${id}`} className="w-full">
        <div className="border mt-10 p-5 ">
          <h1 className="text-3xl">{name}</h1>
          <p className="text-xl">{lastName}</p>
        </div>
      </Link>
      <div className="absolute right-20">
        <button
          className="bg-red-500 p-4 absolute right-5"
          onClick={() => userDelete(id) }
        >
          delete
        </button>
        <button
          className="bg-green-500 p-4 absolute "
          onClick={() => AddUser(id)}
        >
          Add
        </button>
      </div>
    </div>
  );
};
