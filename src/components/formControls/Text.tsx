import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

type TextProps = {
  label: string;
  name: string;
  className?: string;
  required?: boolean;
};

export function Text({
  className,
  label,
  name,
  required,
}: TextProps): ReactElement {
  const { register } = useFormContext();

  return (
    <fieldset
      className={clsx(
        'w-160 h-16 rounded-lg border-2 border-primary bg-[white] focus-within:border-primary-light',
        className
      )}
    >
      <input
        className="text-md peer my-auto w-full px-5 text-primary-dark outline-none"
        type="text"
        {...register(name, { required })}
      />
      <legend className="ml-3 px-1 font-bold text-primary peer-focus:text-primary-light">
        {label}
      </legend>
    </fieldset>
  );
}
