export default function match(str: string, expression: string) {
   const regex = new RegExp(expression)
   return regex.test(str)
}
