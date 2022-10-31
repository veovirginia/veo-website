import Input from "../Input"

export default function StepOne() {
   return (
      <div className="grid grid-cols-2 gap-6 pt-16">
         <Input label="Phone Number" placeholder="(123) 456 7890" type="text" />
         <Input label="Expected Graduation" placeholder="MM/YY" type="text" />
         <Input
            label="Primary Major"
            placeholder="Computer Science"
            type="text"
         />
         <Input label="Startup Idea (optional)" placeholder="" type="text" />
      </div>
   )
}
