import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useUserDeleteMutation,
} from "../redux/service/user-api";

export const SingleUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserQuery(id);

  return (
    <div className="p-4">
      {isLoading ? (
        <h1 className="text-5xl">Loading...</h1>
      ) : (
        <div className="flex">
          <p className="border border-black p-5 w-96">{data?.description}</p>
        </div>
      )}
    </div>
  );
};
