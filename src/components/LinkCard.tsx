import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { BiLinkExternal } from "react-icons/bi"

interface LinkCardProps {
   link: string
   title: string
   description: string
   color: string
}

export default function LinkCard({
   link,
   title,
   description,
   color,
}: LinkCardProps) {
   const [isVisible, setVisible] = useState(false)
   const [x, setX] = useState(0)
   const [y, setY] = useState(0)
   const handleMouse = (e: any) => {
      const rect = e.currentTarget.getBoundingClientRect()

      setX(e.clientX - rect.left - 128)
      setY(e.clientY - rect.top - 128)
   }
   return (
      <motion.a href={link} target="_blank" rel="noreferrer">
         <motion.div
            onMouseMove={handleMouse}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="relative overflow-hidden h-full transition-all group p-4 border-neo-gray-800 bg-noir-800/10 duration-125 border rounded"
         >
            <AnimatePresence>
               {/* {isVisible && ( */}
               <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  animate={{ x, y, scale: 1, opacity: 1 }}
                  className="absolute w-64 h-64 rounded-full top-0 left-0 pointer-events-none"
                  style={{
                     background: `radial-gradient(${color}33 0%, ${color}00 75%)`,
                  }}
               />
               {/* )} */}
            </AnimatePresence>
            <h3 className="text-zinc-100 font-semibold text-lg pb-2">
               {title}
               <BiLinkExternal className="inline-block ml-2 text-noir-400" />
            </h3>
            <p className="text-noir-400">{description}</p>
         </motion.div>
      </motion.a>
   )
}
