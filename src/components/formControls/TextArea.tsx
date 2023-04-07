import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

type TextProps = {
  label: string;
  name: string;
  className?: string;
  required?: boolean;
};

export function TextArea({
  className,
  label,
  name,
  required,
}: TextProps): ReactElement {
  const { register } = useFormContext();

  return (
    <fieldset
      className={clsx(
        'w-160 h-fit rounded-lg border-2 border-primary bg-[white] focus-within:border-primary-light',
        className
      )}
    >
      <textarea
        className="text-md peer mt-2 h-60 w-full px-5 text-primary-dark outline-none "
        {...register(name, { required })}
      />
      <legend className="ml-3 px-1 font-bold text-primary peer-focus:text-primary-light">
        {label}
      </legend>
    </fieldset>
  );
}
