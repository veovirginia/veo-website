import { NextApiResponse } from "next"
import { prisma } from "../../../helpers/db"
import { PutUserBody, SessionUser } from "../../../types/types"

export default async function put(
   res: NextApiResponse,
   body: PutUserBody,
   user: SessionUser
) {
   // Update account in DB
   try {
      await prisma.user.update({
         where: {
            email: user.email,
         },
         data: {
            ...body,
         },
      })
   } catch (error: any) {
      return res.status(500).json({
         message: "Unable to update user information. Please try again later.",
      })
   }

   // Return creation status
   return res.status(200).json({
      message: "Updated user.",
   })
}
