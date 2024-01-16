//api/revalidate

import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  if(process.env.NODE_ENV !== 'production'){
    return response.json({ message: "revalidated successfully" });
  }


  if (request.method === "POST") {
    const { secret, paths } = request.body;

    if (secret != process.env.REVALIDATE_SECRET) {
      return response.status(401).json({ message: "invalid secret" });
    }
    try {
      await Promise.all(paths.map(response.revalidate));
      console.log("revalidated successfully");
      return response.json({ message: "revalidated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "internal Server Error!!!" });
    }
  }
}
