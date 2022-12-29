import jwt from "jsonwebtoken"

/**
 * Generates a JWT for email verification
 * @param email Email of the user
 * @returns JSON Web Token of user for email verification
 */
const SEVEN_DAYS_IN_SECONDS = 604800
export default function generateToken(email: string) {
   const data = {
      // time: Date(),
      email: email,
   }
   const token = jwt.sign(data, process.env.NEXTAUTH_SECRET, {
      expiresIn: SEVEN_DAYS_IN_SECONDS,
   })

   return token
}
