import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import {
   validatePassword,
   validateEmail,
   validateName,
   hash,
} from "../../../helpers/auth"

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

   // TODO: Add typing to account
   const account = req.body

   const passwordError = validatePassword(account.password)
   const emailError = await validateEmail(account.email)
   const nameError = validateName(account.name)

   if (
      passwordError.length <= 0 ||
      emailError.length <= 0 ||
      nameError.length <= 0
   ) {
      let errors = {
         success: false,
         email: emailError,
         password: passwordError,
         name: nameError,
      }
      res.status(400).json(errors)
   }
   const hashedPassword = await hash(account.password)

   if (!hashedPassword) {
      res.status(500).json({ error: "Unable to handle request at the moment." })
   }
   const createAccount = await prisma.user.create({
      data: {
         name: "dasd",
         email: "dad@gmail.com",
         accountVerified: false,
         password: hashedPassword,
         role: "user",
      },
   })
   res.status(201).json({
      success: true,
      message: "Created user.",
   })
}
