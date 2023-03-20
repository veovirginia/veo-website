import cn from "classnames"
import { ReactNode } from "react"

interface ButtonProps {
   children: ReactNode
   type: "button" | "submit"
   variant: "primary" | "secondary"
   className?: string
   disabled?: boolean
   onClick?: () => void
}

export default function Button({
   children,
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
               "bg-zinc-50 text-neutral-900 border-zinc-50 focus:bg-zinc-300 focus:border-zinc-300":
                  !disabled && variant === "primary",
               "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                  disabled && variant === "primary",
            },
            // Secondary Variant
            {
               "rounded border px-4 py-2 bg-transparent border-noir-800 text-noir-200 hover:bg-noir-800/20 focus:bg-noir-800/40":
                  !disabled && variant === "secondary",
            },
            className
         )}
      >
         <div className="flex items-center space-x-2">{children}</div>
      </button>
   )
}

Button.defaultProps = {
   variant: "primary",
   disabled: false,
   onClick: null,
}
