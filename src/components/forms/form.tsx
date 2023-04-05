import { FormEventHandler, ReactElement, RefObject, useCallback } from 'react';
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
  const { handleSubmit } = methods;

  const submitForm = useCallback(
    async (data: FieldValues): Promise<void> => await onSubmit(data),
    []
  );

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(submitForm)}
        className="h-fit w-full rounded-xl bg-secondary px-8 py-4"
      >
        {children}
      </form>
    </FormProvider>
  );
}
