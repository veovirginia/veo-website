import { motion } from "framer-motion"
import { useState } from "react"
import cn from "classnames"

interface ButtonProps {
   text: string
   type: "button" | "submit"
   variant: "primary" | "secondary"
   className?: string
   disabled?: boolean
   onClick?: () => void
}

export default function Button({
   text,
   type,
   variant,
   className,
   disabled,
   onClick,
}: ButtonProps) {
   return (
      <button
         type={type}
         onClick={onClick}
         disabled={disabled}
         className={cn(
            "text-sm transition-colors duration-125 px-2 py-2 border rounded flex justify-center items-center space-x-2 font-sans",
            // Primary Variant
            {
               "bg-zinc-50 text-neutral-900 border-zinc-50":
                  !disabled && variant === "primary",
               "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                  disabled && variant === "primary",
            },
            // Secondary Variant
            {
               "rounded border px-4 py-2 bg-transparent border-noir-800 text-noir-200 hover:bg-noir-800/20":
                  !disabled && variant === "secondary",
            },
            className
         )}
      >
         <div className="flex items-center space-x-2">
            <span>{text}</span>
         </div>
      </button>
   )
}

Button.defaultProps = {
   variant: "primary",
   disabled: false,
   onClick: null,
}
