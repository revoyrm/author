import type { FormEventHandler, ReactElement, RefObject } from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormReset,
} from 'react-hook-form';

import { FormProvider, useForm, useFormState } from 'react-hook-form';
export function Form({
  onSubmit,
  formRef,
  children,
}: {
  onSubmit: SubmitHandler<FieldValues>;
  formRef?: RefObject<HTMLFormElement> | null;
  children: ReactElement | ReactElement[];
}): ReactElement {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(async (data) => {
          await onSubmit(data);
        })}
        className="h-fit w-full rounded-xl bg-secondary px-8 py-4"
      >
        {children}
      </form>
    </FormProvider>
  );
}
