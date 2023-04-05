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
  const { handleSubmit } = methods;
  const onSubmit2 = (data) => console.log('onSubmit2', data);
  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit2)}
        className="h-fit w-full rounded-xl bg-secondary px-8 py-4"
      >
        {children}
      </form>
    </FormProvider>
  );
}
