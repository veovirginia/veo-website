import { ChangeEvent, useState } from "react"

interface InputProps {
   label: string
   placeholder: string
   type: "text" | "number" | "password"
   required?: boolean
   disabled?: boolean
   value: string
   // onChange: (event: ChangeEvent<HTMLInputElement>) => void
   // onChange: (event: any) => void
}

export default function Input({
   label,
   placeholder,
   type,
   required,
   disabled,
   value,
}: // onChange,
InputProps) {
   const [val, setVal] = useState(value)

   return (
      <div className="text-left">
         <p className="text-base text-label-text font-medium pb-2">{label}</p>
         <input
            className="bg-light-background outline-none text-input-text placeholder:text-input-text w-full p-2 rounded focus:outline-blue-500 outline-offset-0 border focus:border-light-background-border border-transparent transition-all duration-125 ease-in-out"
            placeholder={placeholder}
            type={type}
            value={val}
            required={required}
            disabled={disabled}
            onChange={(event: Event) => {
               const target = event.target as HTMLInputElement
               if (target) {
                  setVal(target.value)
               }

               // onChange((event.target? as HTMLInputElement).value)
               // onChange(e.target?.value)
               // setVal(e.target?.value)
            }}
         />
      </div>
   )
}

Input.defaultProps = {
   required: false,
   disabled: false,
}
