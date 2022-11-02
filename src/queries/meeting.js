import instance from "./axiosInstance";

const api_version = "v1";

export const createMeeting = async (token, groupNanoId, meetingInfo) => {
  console.log("queries/group.js/createGroup");
  const { data } = await instance.post(
    `${api_version}/meetings/${groupNanoId}`,
    meetingInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// export const getGroups = async (token) => {
//   console.log("queries/group.js/getGroups");
//   const { data } = await instance.get(`${api_version}/groups/`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };

// export const getGroup = async (token, group_nanoid) => {
//   console.log("queries/group.js/getGroup");
//   const { data } = await instance.get(`${api_version}/groups/${group_nanoid}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };

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
