import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import bcrypt from "bcrypt"
import { verifyPassword } from "../../../helpers/auth"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (!req.body) {
      res.status(400).json({ error: "Empty request body." })
   }

   if (req.method !== "POST") {
      res.status(405).json({ error: "Invalid HTTP method." })
   }

   const account = req.body

   const existingUser = await prisma.user.findUnique({
      where: {
         email: account.email,
      },
   })

   let isValid

   if (!existingUser) {
      res.status(404).json({ error: "User not found." })
   } else {
      isValid = await verifyPassword(account.password, existingUser.password)
   }

   if (!isValid) {
      res.status(401).json({ error: "Password not found for user." })
   }

   if (existingUser) {
      res.status(200).json({ success: true })
   } else {
      res.status(401).json({ error: "Invalid login." })
   }
}
