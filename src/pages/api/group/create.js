import { createGroup } from "/src/queries/group";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  // try {
  const { accessToken } = await getAccessToken(req, res);
  if (!accessToken) {
    res.status(400).json({ user: null, message: "Missing user_id" });
  } else {
    // Has accessToken
    // console.log(accessToken);
    // console.log(req.body);
    const groupInfo = req.body;
    // const userInfo = { email: "a@a.a" };
    const response = await createGroup(accessToken, groupInfo);
    return res.status(200).json(response);
  }
  // } catch (error) {
  //   console.error(error);
  // }
});
