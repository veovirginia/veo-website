import { match } from "../regex"

/**
 * Check if account password meets complexity requirements
 * @param password Password to check
 * @returns Array of errors. Array is empty if there are no errors.
 */
export default function validatePassword(password: string) {
   let errors: string[] = []

   if (!password || password.length < 8 || password.length > 32) {
      errors.push("Password must be between 8 and 32 characters.")
   }
   if (!match(password, "(?=.*[a-z])(?=.*[A-Z])")) {
      errors.push(
         "Password must contain at least one lowercase letter and uppercase letter."
      )
   }
   if (!match(password, "(?=.*[0-9])")) {
      errors.push("Password must contain at least one number.")
   }
   if (!match(password, "(?=.*[-+_!@#$%^&*., ?])")) {
      errors.push("Password must contain at least one special character.")
   }
   return errors
}
