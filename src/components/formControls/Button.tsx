import clsx from 'clsx';
import type { ComponentPropsWithRef, ForwardedRef, ReactElement } from 'react';
import { forwardRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  label: string;
  isSubmit: boolean;
  className?: string;
};

function ButtonComponent(
  { className, label, name, isSubmit, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  return (
    <button
      ref={ref}
      className={clsx(
        'w-fit rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-secondary hover:bg-primary-light active:bg-primary-dark active:text-secondary-light',
        className
      )}
      type={isSubmit ? 'submit' : 'button'}
      {...props}
    >
      {label}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonComponent
);
