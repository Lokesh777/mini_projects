import type { CSSProperties } from "react";

type InputProp = {
  type: string;
  name?: string;
  id?: string;
  checked?: boolean;
  value?: string | number | readonly string[]
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?:CSSProperties
};

const CustomInput = ({ type, name, id, value,checked, onChange, onKeyDown, style, placeholder }: InputProp) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      checked={checked}
      style={ type === "checkbox" ? style :{
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
        ...style,
      }}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      
    />
  );
};

export default CustomInput;
