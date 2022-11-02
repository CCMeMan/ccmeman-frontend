import { getGroups, createGroup } from "/src/queries/group";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  if (!accessToken) {
    res.status(400).json({ user: null, message: "Missing user_id" });
  } else {
    switch (req.method) {
      case "GET": {
        const response = await getGroups(accessToken);
        return res.status(200).json(response);
      }
      case "POST": {
        const groupInfo = req.body;
        const response = await createGroup(accessToken, groupInfo);
        return res.status(200).json(response);
      }
    }
  }
});
