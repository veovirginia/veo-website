import { useState } from "react"

interface InputProps {
   label: string
   placeholder: string
   type: "text" | "number" | "password"
   required?: boolean
   disabled?: boolean
   value: string
   onChange: (event: any) => void
}

export default function Input({
   label,
   placeholder,
   type,
   required,
   disabled,
   value,
   onChange,
}: InputProps) {
   const [val, setVal] = useState(value)

   return (
      <div className="text-left">
         <p className="text-sm text-noir-300 font-regular pb-2">{label}</p>
         <input
            className="border-neo-gray-800 bg-noir-900 outline-none text-neutral-400 placeholder:text-noir-500 w-full p-2 rounded focus:outline-blue-500 outline-offset-0 border focus:border-light-background-border transition-all duration-125 ease-in-out"
            placeholder={placeholder}
            type={type}
            value={val}
            required={required}
            disabled={disabled}
            onChange={(event: any) => {
               const target = event.target as HTMLInputElement
               if (target) {
                  setVal(target.value)
                  onChange(event.target?.value)
               }
            }}
         />
      </div>
   )
}

Input.defaultProps = {
   required: false,
   disabled: false,
}
