import { getMeeting } from "/src/queries/meeting";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const meetingNanoId = req.query["meeting-nano-id"];
  const { accessToken } = await getAccessToken(req, res);
  if (!accessToken) {
    res.status(400).json({ user: null, message: "Missing user_id" });
  } else if (!meetingNanoId) {
    res.status(404).json({ message: "meeting-nano-id is required" });
  } else {
    // Access by /api/meeting?meeting-nano-id=xxx
    switch (req.method) {
      case "GET": {
        const response = await getMeeting(accessToken, meetingNanoId);
        return res.status(200).json(response);
      }
      case "PUT": {
        // FIXME: TODO: update meeting and voting.
      }
      case "POST": {
        // FIXME: TODO: think about voting.
        // const meetingInfo = req.body;
        // const response = await createMeeting(
        //   accessToken,
        //   group_nanoid,
        //   meetingInfo
        // );
        // return res.status(200).json(response);
      }
    }
  }
});
