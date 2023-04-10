import clsx from 'clsx';
import type { ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

export type DropdownOption = {
  value: number;
  label: string;
};

type DropdownProps = {
  label: string;
  name: string;
  options: DropdownOption[];
  className?: string;
  required?: boolean;
};

const bgColor = '#e5edef';
const textColor = '#00283c';
const hoverColor = '#407c95';

export function Dropdown({
  className,
  options,
  label,
  name,
  required,
}: DropdownProps): ReactElement {
  const methods = useFormContext();

  return (
    <fieldset
      className={clsx(
        'w-160 h-16 rounded-lg border-2 border-primary bg-[white] focus-within:border-primary-light',
        className
      )}
    >
      <Controller
        control={methods.control}
        // defaultValue={default_value}
        name={name}
        render={({ field: { onChange, value, ref } }): ReactElement => (
          <Select
            // @ts-expect-error inputRef is a custom prop to connect to react hook form
            inputRef={ref}
            instanceId={name}
            options={options}
            required={required}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: 0,
                boxShadow: 'none',
              }),
              option: (styles, { isSelected, isFocused }) => ({
                paddingLeft: '8px',
                backgroundColor: isSelected || isFocused ? bgColor : undefined,
                color: textColor,
                ':active': {
                  ...styles[':active'],
                  backgroundColor: isSelected ? bgColor : undefined,
                  color: textColor,
                },
              }),
              multiValue: (styles) => ({
                ...styles,
                backgroundColor: bgColor,
              }),
              multiValueLabel: (styles) => ({
                ...styles,
                color: textColor,
              }),
              multiValueRemove: (styles) => ({
                ...styles,
                color: textColor,
                ':hover': {
                  color: hoverColor,
                },
              }),
            }}
            value={options.filter((c) => value?.includes(c.value))}
            isMulti
            onChange={(val): void => {
              onChange(val.map((c) => c.value));
            }}
          />
        )}
      />
      <legend className="ml-3 px-1 font-bold text-primary peer-focus:text-primary-light">
        {label}
      </legend>
    </fieldset>
  );
}
