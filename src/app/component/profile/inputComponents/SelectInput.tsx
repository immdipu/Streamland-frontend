import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const getMultiValueRemoveStyle = (styles: any, { data }: any) => {
  return {
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "#384aa6",
      color: "white",
    },
  };
};

const getOptionStyle = (styles: any, { data, isFocused, isSelected }: any) => {
  return {
    ...styles,
    color: isSelected ? "#f0f8ff" : "#f0f8ffd4",
    backgroundColor: "#262626",
    cursor: "pointer",
    "&:hover": {
      border: "none",
      backgroundColor: "#2626268f",
    },
  };
};

const getMultiValueStyle = (styles: any, { data }: any) => {
  return {
    ...styles,
    backgroundColor: "#323232",
    borderRadius: "4px",
    color: "#ffffffa3",
  };
};

const multiValueLabelStyle = (baseStyles: any) => ({
  ...baseStyles,
  color: "#ffffffa3",
  fontWeight: "normal",
});

interface optionsTypes {
  value: string;
  label: string;
}

interface SelectInputTypes {
  label: string;
  name: string;
  defaultValue?: optionsTypes[];
  value: optionsTypes[];
  options: optionsTypes[];
  onChange: (e: any) => void;
}

const SelectInput: React.FC<SelectInputTypes> = ({
  label,
  name,
  defaultValue,
  value,
  options,
  onChange,
}) => {
  const animatedComponents = makeAnimated();
  return (
    <div className="flex max-md:flex-col ">
      <label
        htmlFor="username"
        className="text-base   w-full max-w-[280px]  flex items-center font-medium text-neutral-200 text-opacity-60"
      >
        {label}
      </label>
      <Select
        className="w-2/3 max-md:mt-2 max-md:w-11/12 hover:border-none mr-6 max-md:mr-0"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#fffffff7" : "#a7a7a74a",
            backgroundColor: "#262626",
            outline: "none",
            boxShadow: "none",

            ":hover": {
              borderColor: "#a7a7a74a",
            },
          }),
          option: getOptionStyle,
          multiValue: getMultiValueStyle,
          multiValueRemove: getMultiValueRemoveStyle,
          multiValueLabel: multiValueLabelStyle,
        }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        onChange={onChange}
        options={options}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default SelectInput;
