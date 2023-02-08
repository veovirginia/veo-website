import { BiX } from "react-icons/bi"
import cn from "classnames"

interface AlertProps {
   message: string
   variant: "error" | "success" | "info"
   onClose: () => void
}

export default function Alert({ message, variant, onClose }: AlertProps) {
   return (
      <div
         className={cn(
            "flex justify-between items-start p-2 text-sm border space-x-4",
            {
               "border-vesuvius-900 bg-vesuvius-900/30 rounded text-vesuvius-600":
                  variant === "error",
               "border-blue-900 bg-blue-900/30 rounded text-blue-600":
                  variant === "success",
            }
         )}
      >
         <p>{message}</p>
         <button type="button" onClick={() => onClose()} className="">
            <BiX className="text-xl" />
         </button>
      </div>
   )
}
