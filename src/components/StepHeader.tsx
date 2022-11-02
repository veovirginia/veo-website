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
         <p className="w-fit text-lg font-medium bg-gradient-to-br from-[#F675A8] to-[#9581FF] overflow-visible bg-clip-text text-transparent tracking-[0.25rem] pb-6">
            {step}
         </p>
         <h1 className="font-semibold text-white text-4xl">{title}</h1>
         <p className="text-base font-regular tracking-wide pt-2 text-white opacity-60">
            {description}
         </p>
      </div>
   )
}
