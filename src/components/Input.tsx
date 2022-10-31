interface InputProps {
   label: string
   placeholder: string
   type: "text" | "number" | "password"
}

export default function Input({ label, placeholder, type }: InputProps) {
   return (
      <div className="text-left">
         <p className="text-base text-label-text font-medium pb-2">{label}</p>
         <input
            className="bg-light-background outline-none text-input-text placeholder:text-input-text w-full p-2 rounded focus:outline-blue-500 outline-offset-0 border focus:border-light-background-border border-transparent transition-all duration-125 ease-in-out"
            placeholder={placeholder}
            type={type}
         />
      </div>
   )
}
