import React from "react";
import { Link } from "react-router-dom";
import { useTodoDeleteMutation } from "../redux/service/todo-api";

export const Card = ({ description, title, id }) => {
  const [todoDelete] = useTodoDeleteMutation()

  return (
    <div className="border border-black m-3 p-5">
      <Link to={`/todo/${id}`}>
        <h2>{title}</h2>
        <p>{description}</p>
      </Link>
      <button className="border border-red p-2 bg-red-700" onClick={() => todoDelete(id)}>Delete</button>
    </div>
  );
};
