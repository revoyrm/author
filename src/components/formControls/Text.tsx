import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type TextProps = {
  label: string;
  name: string;
  className?: string;
};

export function Text({ className, label, name }: TextProps): ReactElement {
  const { register } = useForm();

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
        {...register(name)}
      />
      <legend className="ml-3 px-1 font-bold text-primary peer-focus:text-primary-light">
        {label}
      </legend>
    </fieldset>
  );
}