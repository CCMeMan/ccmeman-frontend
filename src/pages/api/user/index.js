import { createUser, updateUser } from "/src/queries/user";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  if (!accessToken) {
    res.status(400).json({ user: null, message: "Missing user_id" });
  } else {
    switch (req.method) {
      case "GET": {
        // FIXME: TODO: Implement getUser()
        const userInfo = await createUser(accessToken);
        return res.status(200).json(userInfo);
      }
      case "POST": {
        const userInfo = await createUser(accessToken);
        return res.status(200).json(userInfo);
      }
      case "PUT": {
        const userInfo = req.body;
        const response = await updateUser(accessToken, userInfo);
        return res.status(200).json(response);
      }
    }
  }
});
