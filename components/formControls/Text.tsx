import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type TextProps = {
  label: string;
  name: string;
};

export function Text({ label, name }: TextProps): ReactElement {
  const { register } = useForm();

  return (
    <fieldset className="w-160 h-20 rounded-lg border-2 border-primary bg-[white]">
      <legend className="ml-3 px-1 font-bold text-primary">{label}</legend>
      <input
        className="mt-2 w-full px-5 text-xl outline-none"
        defaultValue="Testing 1 2 3"
        type="text"
        {...register(name)}
      />
    </fieldset>
  );
}
