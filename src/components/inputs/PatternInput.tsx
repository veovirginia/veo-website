import cn from "classnames"
import { ChangeEvent } from "react"
import { FieldError } from "react-hook-form"
import { PatternFormat } from "react-number-format"

interface PatternInputProps {
   label: string
   placeholder: string
   format: string
   patternChar?: string
   allowEmptyFormatting?: boolean
   mask?: string
   required?: boolean
   disabled?: boolean
   value: string
   error?: FieldError | undefined
   onValueChange: (event: any) => void
}

export default function PatternInput({
   label,
   placeholder,
   format,
   patternChar,
   allowEmptyFormatting,
   mask,
   required,
   disabled,
   value,
   error,
   onValueChange,
}: PatternInputProps) {
   return (
      <div className="text-left">
         <p className="text-sm text-noir-300 font-regular pb-2">{label}</p>
         <PatternFormat
            className={cn(
               "border-neo-gray-800 bg-noir-800/10 outline-none text-neutral-400 placeholder:text-noir-500 w-full p-2 rounded focus:outline-blue-500 outline-offset-0 border focus:border-light-background-border transition-all duration-125 ease-in-out",
               {
                  "border-red-500": error,
               }
            )}
            format={format}
            patternChar={patternChar}
            allowEmptyFormatting={allowEmptyFormatting}
            mask={mask}
            placeholder={placeholder}
            value={value}
            required={required}
            disabled={disabled}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
               const target = event.target as HTMLInputElement
               if (target) {
                  onValueChange(event.target?.value)
               }
            }}
         />
         <p className="mt-1 text-red-500 text-sm">{error?.message}</p>
      </div>
   )
}

PatternInput.defaultProps = {
   required: false,
   disabled: false,
   error: undefined,
   patternChar: "#",
   allowEmptyFormatting: false,
   mask: undefined,
}
