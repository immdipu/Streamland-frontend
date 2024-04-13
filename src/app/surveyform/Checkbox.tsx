import React from "react";

interface CheckboxProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="radio"
        name="hearaboutus"
        className="w-4 h-4"
        id={value}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={value} className="text-neutral-300">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
