import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import put from "./put"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { method, body } = req

   // TODO: Add body schema validation

   const session = await getSession({ req })

   // Check if logged in
   if (!session) {
      return res.status(401).json({ message: "Must be logged in." })
   }
   // Update user info
   if (method === "PUT") {
      // Check empty body
      if (!body) {
         return res.status(400).json({ message: "Empty request body." })
      }
      return put(res, body, session.user)
   }

   // Check request method
   return res.status(405).json({ message: "Invalid HTTP method." })
}
