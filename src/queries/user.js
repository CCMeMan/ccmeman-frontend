import instance from "./axiosInstance";
// import { useUser } from "@auth0/nextjs-auth0";

const api_version = "v1";

export const createUser = async (token) => {
  console.log("queries/user.js/createUser");
  const { data } = await instance.post(
    `${api_version}/users/`,
    {}, // no data
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const updateUser = async (token, userInfo) => {
  console.log("queries/user.js/updateUser");
  console.log(userInfo);
  const { data } = await instance.put(`${api_version}/users/`, userInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
