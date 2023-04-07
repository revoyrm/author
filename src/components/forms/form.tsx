import type { ReactElement, RefObject } from 'react';
import { useCallback } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

export function Form({
  initialValues,
  onSubmit,
  formRef,
  children,
}: {
  initialValues: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
  formRef?: RefObject<HTMLFormElement> | null;
  children: ReactElement | ReactElement[];
}): ReactElement {
  const methods = useForm({
    defaultValues: initialValues,
  });
  const { handleSubmit } = methods;

  const submitForm = useCallback(
    async (data: FieldValues): Promise<void> => await onSubmit(data),
    []
  );

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        className="h-fit w-full rounded-xl bg-secondary px-8 py-4"
        onSubmit={handleSubmit(submitForm)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
