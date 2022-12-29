import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import {
   validatePassword,
   validateEmail,
   validateName,
   hash,
} from "../../../helpers/auth"
import { RegisterBody } from "../../../types/auth"

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

   const account: RegisterBody = req.body

   const passwordError = validatePassword(account.password)
   const emailError = await validateEmail(account.email)
   const nameError = validateName(account.name)

   // Validate account details
   if (
      passwordError.length > 0 ||
      emailError.length > 0 ||
      nameError.length > 0
   ) {
      let errors = {
         success: false,
         email: emailError,
         password: passwordError,
         name: nameError,
      }
      return res.status(400).json(errors)
   }

   // Hash password
   const hashedPassword = await hash(account.password)
   if (!hashedPassword) {
      return res
         .status(500)
         .json({ error: "Unable to handle request at the moment." })
   }

   // Create account in DB
   try {
      await prisma.user.create({
         data: {
            name: account.name,
            email: account.email,
            accountVerified: false,
            password: hashedPassword,
            role: "user",
         },
      })
   } catch (error: any) {
      console.log(error)
      throw error
   }

   // Return creation status
   return res.status(201).json({
      success: true,
      message: "Created user.",
   })
}
