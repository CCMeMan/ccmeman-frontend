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

export const getMeetings = async (token, groupNanoId) => {
  console.log("queries/group.js/getMeetings");
  const { data } = await instance.get(
    `${api_version}/meetings/${groupNanoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getMeeting = async (token, meetingNanoId) => {
  console.log("queries/group.js/getMeeting");
  const { data } = await instance.get(
    `${api_version}/meetings/?meeting-nano-id=${meetingNanoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
