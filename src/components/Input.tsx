interface InputProps {
   title: string
   placeholder: string
   type: "text" | "number" | "password"
}

export default function Input({ title, placeholder, type }: InputProps) {
   return (
      <div className="text-left">
         <p className="text-base text-label-text font-medium pb-2">{title}</p>
         <input
            className="bg-light-background outline-none text-input-text placeholder:text-input-text w-full p-2 rounded focus:outline-none border border-light-background-border focus:bg-transparent transition-all duration-125 ease-in-out"
            placeholder={placeholder}
            type={type}
         />
      </div>
   )
}
