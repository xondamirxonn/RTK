import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleDataQuery } from "../redux/service/todo-api";

export const SingleData = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleDataQuery(id);
  return (
    <div className="">
      {isLoading ? (
        <h1 className="text-5xl">Loading...</h1>
      ) : (
        <div>{data?.description}</div>
      )}
    </div>
  );
};
