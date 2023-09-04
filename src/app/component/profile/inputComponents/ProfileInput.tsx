import React from "react";

interface InputTypes {
  label: string;
  name: string;
  defaultValue?: string;
  value: string;
  type: string;
  required: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput: React.FC<InputTypes> = ({
  label,
  name,
  defaultValue,
  value,
  type,
  required,
  disabled = false,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <div className="flex max-md:flex-col">
        <label
          htmlFor="username"
          className="text-base   w-full max-w-[280px]  flex items-center font-medium text-neutral-200 text-opacity-60"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className="bg-inherit w-2/3 placeholder:text-opacity-50 placeholder:text-_welcometext_lightblue placeholder:font-light max-md:mt-2 max-md:w-11/12 text-sm py-2 mr-6 max-md:mr-0 font-normal tracking-wide text-neutral-400 outline-none focus-within:border-opacity-75 duration-200 transition-all ease-linear focus-within:text-neutral-200 font-Inter border bg-opacity-40  border-_light_white border-opacity-30 rounded-md  px-2"
          required={required}
        />
      </div>
    </>
  );
};

export default ProfileInput;
