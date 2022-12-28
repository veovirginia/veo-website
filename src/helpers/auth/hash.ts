import bcrypt from "bcrypt"

/**
 * Hashes password with salt.
 * @param password Password to hash
 * @param saltRounds Salt rounds for hashing
 * @returns Hashed password
 */
export default async function hash(password: string, saltRounds: number = 10) {
   try {
      const salt = await bcrypt.genSalt(saltRounds)
      return await bcrypt.hash(password, salt)
   } catch (error: any) {
      console.error(error)
   }
   return ""
}
