import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { prisma } from "../../../helpers/db"

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   // Check request method
   if (req.method !== "GET") {
      return res.status(405).json({ error: "Invalid HTTP method." })
   }

   if (!req.headers.authorization) {
      return res.status(400).json({ error: "Missing token." })
   }

   // Get JWT from Authorization header
   const token = req.headers.authorization.split(" ")[1]

   // Check if JWT is valid
   let verify: any
   try {
      verify = jwt.verify(token, process.env.NEXTAUTH_SECRET)
   } catch (error) {
      return res.status(400).json({ error: "Invalid token." })
   }

   // Check if JWT exists
   try {
      const results = await prisma.emailVerification.findUnique({
         where: {
            token: token,
         },
      })
      if (!results) {
         return res.status(200).json({ error: "Token does not exist." })
      }
   } catch (error) {
      return res.status(400).json({ error: "Invalid token." })
   }

   // Update user email verification to true, then delete JWT
   try {
      await prisma.user.update({
         where: {
            email: verify.email,
         },
         data: {
            emailVerified: true,
         },
      })
      await prisma.emailVerification.delete({
         where: {
            token: token,
         },
      })
   } catch (error: any) {
      return res
         .status(500)
         .json({ error: "Unable to process request at the moment." })
   }

   return res
      .status(200)
      .json({ success: true, message: "Verified account email." })
}
