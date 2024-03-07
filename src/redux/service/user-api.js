import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "UserApi",
  
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_URL }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (page = 1) => {
        return {
          url: "/users",
          params: { _page: page, _limit: 4 },
        };
      },
      providesTags: ["getUser"],
      transformResponse: (data, res) => {
        const totalPage = res?.response.headers.get("X-total-count");

        const pageSize = parseInt(Number(totalPage) / 4) + 1;
        return { data, pageSize };
      },
    }),
    postUser: build.mutation({
      query: (data) => {
        return {
          url: "/users",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    getSingleUser: build.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
        };
      },
      invalidatesTags: ["getUser"],
    }),
    userDelete: build.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const {
  useGetUserQuery,
  usePostUserMutation,
  useGetSingleUserQuery,
  useUserDeleteMutation,
} = userApi;
