import { BiCheck } from "react-icons/bi"
import cn from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { OnboardContextMember } from "../types/types"

interface MemberRowProps {
   index: number
   name: string
   image: string
   major: string
   grad: string
   onclick: (idx: number) => void
   selected: OnboardContextMember | null
}

export default function MemberRow({
   index,
   name,
   image,
   major,
   grad,
   onclick,
   selected,
}: MemberRowProps) {
   return (
      <button
         onClick={() => onclick(index)}
         className={cn(
            "relative p-3 flex w-full items-center justify-between hover:bg-noir-800/20 transition-colors ease-in duration-100 border-noir-700/50 border-t last:border-b border-x first:rounded-t last:rounded-b"
         )}
      >
         {selected?.name === name && (
            <motion.div
               layoutId="activeMember"
               initial={{
                  opacity: 0,
               }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute top-0 left-0 h-full w-full rounded border !border-blue-500/75 !bg-blue-500/10"
            />
         )}
         <div className="text-left flex gap-3 items-center">
            <div className="flex items-center justify-center">
               <Image
                  src={image}
                  width="40px"
                  height="40px"
                  className="rounded-full"
                  alt={name}
               />
            </div>
            <div className="">
               <p className="text-zinc-100 text-sm">{name}</p>
               <p className="text-sm text-noir-400">
                  {major} • Class of {grad}
               </p>
            </div>
         </div>
         <div className="flex justify-end ml-2">
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-transparent border border-noir-700/50">
               <AnimatePresence>
                  {selected?.name === name ? (
                     <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-2 w-2 bg-blue-ribbon-700 rounded-full"
                     />
                  ) : null}
               </AnimatePresence>
            </div>
            {/* {selected === index && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                     >
                        <BiCheck className="text-blue-500 text-2xl" />
                     </motion.div>
                     
                  )} */}
         </div>
      </button>
   )
}
