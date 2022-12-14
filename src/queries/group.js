import instance from "./axiosInstance";
// import { useUser } from "@auth0/nextjs-auth0";

const api_version = "v1";

export const createGroup = async (token, groupInfo) => {
  console.log("queries/group.js/createGroup");
  const { data } = await instance.post(`${api_version}/groups/`, groupInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getGroups = async (token) => {
  console.log("queries/group.js/getGroups");
  const { data } = await instance.get(`${api_version}/groups/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getGroup = async (token, group_nanoid) => {
  console.log("queries/group.js/getGroup");
  const { data } = await instance.get(`${api_version}/groups/${group_nanoid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// export const updateUser = async (token, userInfo) => {
//   console.log("queries/user.js/updateUser");
//   console.log(userInfo);
//   const { data } = await instance.put(`${api_version}/users/`, userInfo, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };
