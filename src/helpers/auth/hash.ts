import bcrypt from "bcrypt"

export default async function hash(password: string, saltRounds: number = 10) {
   try {
      const salt = await bcrypt.genSalt(saltRounds)
      return await bcrypt.hash(password, salt)
   } catch (error: any) {
      console.error(error)
   }
   return ""
}
