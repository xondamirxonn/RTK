import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_URL }),
  endpoints: (build) => ({
    getTodo: build.query({
      query: (page = 1, limit = 4) => {
        return {
          url: "/todos",

          params: { _page: page, _limit: limit },
        };
      },
      providesTags: ["getTodo"],
      transformResponse: (data, res) => {
        const totalCount = res?.response?.headers.get("X-total-count");

        const pageSize = parseInt(Number(totalCount) / 4) + 1;
        return { data, pageSize };
      },
    }),
    postTodo: build.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: data,

          // params: {_page: 1, _limit: 4}
        };
      },
      invalidatesTags: ["getTodo"],
    }),
    getSingleData: build.query({
      query: (id) => {
        return {
          url: `/todos/${id}`,
        };
      },
    }),

    TodoDelete: build.mutation({
      query: (id) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["getTodo"],
    }),
  }),
});

export const { useGetTodoQuery, usePostTodoMutation, useGetSingleDataQuery, useTodoDeleteMutation } =
  todoApi;
