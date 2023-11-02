import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    console.log("LoginCredential.ts")
    console.log(req.body)
}