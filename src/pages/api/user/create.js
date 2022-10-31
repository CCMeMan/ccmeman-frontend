import { createUser } from "/src/queries/user";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    if (!accessToken) {
      res.status(400).json({ user: null, message: "Missing user_id" });
    } else {
      // Has accessToken
      // console.log(accessToken);
      const userInfo = await createUser(accessToken);
      //   console.log(userInfo);

      return res.status(200).json(userInfo);
    }
  } catch (error) {
    // console.error(error);
  }
});
