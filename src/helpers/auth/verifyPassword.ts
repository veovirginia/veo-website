import { compare } from "bcrypt"

/**
 * Verify if the password provided is the same as the hashed password in the database.
 * @param password Password provided from user.
 * @param hashedPassword Password to check against in the database.
 * @returns True if passwords match and false if they don't.
 */
export default async function verifyPassword(
   password: string,
   hashedPassword: string
) {
   const isValid = await compare(password, hashedPassword)
   return isValid
}
