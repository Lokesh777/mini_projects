export type FormElement = {
    id:"name" | "email" | "gender" | "age" | "skills"
    label:string
    type:string
    required?:boolean
    placeholder?:string
    options?:string[]
}

export const formConfig:FormElement[] = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter your name"
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email"
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    required: false,
    placeholder: "Enter your age"
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: "skills",
    label: "Skills",
    type: "checkbox",
    options: ["React", "TypeScript", "Node"]
  }
]