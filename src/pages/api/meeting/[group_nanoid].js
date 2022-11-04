import { createMeeting, getMeetings } from "/src/queries/meeting";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { group_nanoid } = req.query;
  const { accessToken } = await getAccessToken(req, res);
  if (!accessToken) {
    res.status(400).json({ user: null, message: "Missing user_id" });
  } else {
    switch (req.method) {
      case "GET": {
        const response = await getMeetings(accessToken, group_nanoid);
        return res.status(200).json(response);
      }
      case "POST": {
        const meetingInfo = req.body;
        const response = await createMeeting(
          accessToken,
          group_nanoid,
          meetingInfo
        );
        return res.status(200).json(response);
      }
    }
  }
});
