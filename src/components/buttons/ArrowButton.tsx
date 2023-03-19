import { motion } from "framer-motion"
import { useState } from "react"
import cn from "classnames"

interface ButtonProps {
   text: string
   type: "button" | "submit"
   className?: string
   disabled?: boolean
   direction: "left" | "right"
   onClick?: () => void
}

export default function ArrowButton({
   text,
   type,
   className,
   disabled,
   direction,
   onClick,
}: ButtonProps) {
   const [isButtonHover, setButtonHover] = useState(false)
   return (
      <button
         type={type}
         onClick={onClick}
         disabled={disabled}
         className={cn(
            "text-sm transition-colors duration-125 px-2 py-2 border rounded flex justify-center items-center space-x-2 font-sans",
            {
               "bg-zinc-50 text-noir-800 border-zinc-50": !disabled,
               "bg-noir-800/30 text-noir-600 border-noir-800 cursor-not-allowed":
                  disabled,
            },
            className
         )}
         onMouseEnter={() => setButtonHover(true)}
         onMouseLeave={() => setButtonHover(false)}
      >
         <div className="flex items-center space-x-2">
            {direction === "left" ? (
               <motion.div
                  animate={{
                     x: isButtonHover ? -5 : 0,
                  }}
                  transition={{
                     ease: "easeIn",
                     duration: 0.1,
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="feather feather-arrow-left"
                  >
                     <line x1="19" y1="12" x2="5" y2="12"></line>
                     <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
               </motion.div>
            ) : null}
            <span>{text}</span>
            {direction === "right" ? (
               <motion.div
                  animate={{
                     x: isButtonHover ? 5 : 0,
                  }}
                  transition={{
                     ease: "easeIn",
                     duration: 0.1,
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="feather feather-arrow-right"
                  >
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                     <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
               </motion.div>
            ) : null}
         </div>
      </button>
   )
}

ArrowButton.defaultProps = {
   className: "",
   disabled: false,
   onClick: null,
}
