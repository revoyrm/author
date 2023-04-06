import clsx from 'clsx';
import type { ComponentPropsWithRef, ForwardedRef, ReactElement } from 'react';
import { forwardRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  label: string;
  isSubmit: boolean;
  dataInfo: string;
  className?: string;
};

// Todo Make this button force the user to confirm before acting
function ButtonComponent(
  { className, label, name, isSubmit, dataInfo, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  return (
    <button
      data-info={dataInfo}
      ref={ref}
      className={clsx(
        'text-md w-fit bg-none p-1 font-bold text-primary hover:text-primary-light active:text-primary-dark',
        className
      )}
      type={isSubmit ? 'submit' : 'button'}
      {...props}
    >
      {label}
    </button>
  );
}

export const ConfirmButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonComponent
);
