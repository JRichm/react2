import { NextApiRequest, NextApiResponse } from "next";

export default async(req, res) => {
    if (req.method === "POST") {

        if (req.body.action === "createAuthorizedUser") {
            console.log("creating authorized user")
            res.status(200).json({ message: "Create Authorized User action executed" })

        } else if (req.body.action === "loginAuthorized") {
            console.log("logging in authorized user")
            res.status(200).json({ message: "Log In Authorized User action executed" })

        } else if (req.body.action === "otherAction") {
            console.log("other action initiated")
            res.status(200).json({ message: "other action executed" })

        } else {
            res.status(400).json({ error: "Invalid Action" })
        }
        
    } else {
        res.status(405).json({ error: "Method not allowed" })
    }
}