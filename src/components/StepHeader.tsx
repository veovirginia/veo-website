interface StepHeaderProps {
   step: string
   title: string
   description: string
}

export default function StepHeader({
   step,
   title,
   description,
}: StepHeaderProps) {
   return (
      <div className="text-center flex items-center flex-col">
         <p className="w-fit text-sm font-medium bg-gradient-to-br from-[#F675A8] to-[#9581FF] overflow-visible bg-clip-text text-transparent tracking-[0.25rem] pb-2">
            {step}
         </p>
         <h1 className="font-semibold text-zinc-50 text-3xl">{title}</h1>
         <p className="text-base font-regular tracking-wide pt-1 text-noir-300">
            {description}
         </p>
      </div>
   )
}
