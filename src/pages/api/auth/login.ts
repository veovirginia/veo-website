import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import bcrypt from "bcrypt"
import { verifyPassword } from "../../../helpers/auth"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   // Check empty body
   if (!req.body) {
      return res.status(400).json({ error: "Empty request body." })
   }

   // Check request method
   if (req.method !== "POST") {
      return res.status(405).json({ error: "Invalid HTTP method." })
   }

   const account = req.body

   // Check if email exists in DB
   const existingUser = await prisma.user.findUnique({
      where: {
         email: account.email,
      },
   })

   let isValid

   if (!existingUser) {
      return res.status(404).json({ error: "User not found." })
   } else {
      isValid = await verifyPassword(account.password, existingUser.password)
   }

   if (!isValid) {
      return res.status(401).json({ error: "Password not found for user." })
   }

   if (existingUser) {
      return res.status(200).json({ success: true })
   } else {
      return res.status(401).json({ error: "Invalid login." })
   }
}
