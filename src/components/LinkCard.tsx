import { BiLinkExternal } from "react-icons/bi"

interface LinkCardProps {
   link: string
   title: string
   description: string
}

export default function LinkCard({ link, title, description }: LinkCardProps) {
   return (
      <a href={link} target="_blank" rel="noreferrer">
         <div className="h-full hover:-translate-y-2 transform transition-all group p-4 rounded bg-transparent border-neutral-700 hover:border-zinc-100 hover:bg-zinc-100 duration-125 border">
            <h3 className="text-zinc-100 group-hover:text-zinc-800 font-semibold text-lg pb-2">
               {title}
               <BiLinkExternal className="inline-block ml-2 group-hover:text-noir-500 text-noir-400" />
            </h3>
            <p className="text-noir-400">{description}</p>
         </div>
      </a>
   )
}