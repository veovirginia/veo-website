import { BiCheck } from "react-icons/bi"
import cn from "classnames"
import { AnimatePresence, motion } from "framer-motion"

interface MemberRowProps {
   index: number
   name: string
   major: string
   grad: string
   onclick: (idx: number) => void
   selected: number
}

export default function MemberRow({
   index,
   name,
   major,
   grad,
   onclick,
   selected,
}: MemberRowProps) {
   return (
      <button
         onClick={() => onclick(index)}
         className={cn(
            "relative p-3 py-2 flex w-full items-center justify-between hover:bg-neutral-800/30 transition-colors ease-in duration-100 border-neutral-700/50 border rounded"
         )}
      >
         {selected === index && (
            <motion.div
               layoutId="activeMember"
               initial={{
                  opacity: 0,
               }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute top-0 left-0 h-full w-full border rounded !border-blue-500/75 !bg-blue-500/10"
            />
         )}
         <div className="text-left flex gap-3 items-center">
            <div className="rounded-full overflow-none w-10 h-10 bg-blue-500" />
            <div className="">
               <p className="text-neutral-200 font-medium text-base">{name}</p>
               <p className="text-sm text-neutral-400">
                  {major} • Class of {grad}
               </p>
            </div>
         </div>
         <AnimatePresence>
            <div className="">
               {selected === index && (
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.25, delay: 0.1 }}
                  >
                     <BiCheck className="text-blue-500 text-2xl" />
                  </motion.div>
               )}
            </div>
         </AnimatePresence>
      </button>
   )
}
