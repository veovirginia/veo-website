/**
 * Check if account name is valid
 * @param name Name to check
 * @returns Array of errors. Array is empty if there are no errors.
 */
export default function validateName(name: string) {
   let errors: string[] = []
   if (!name || name.length < 0 || name.length >= 24) {
      errors.push("Invalid length. Must be between 1 and 24 characters")
   }
   return errors
}
