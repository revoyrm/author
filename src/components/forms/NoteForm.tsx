import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { NoteFormData } from '../../types/forms';
import { isNoteFormData } from '../../types/forms';
import type { Note } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { Form } from './Form';

export function NoteForm({
  note,
  onCancel,
  onSubmit,
}: {
  note?: Note;
  onCancel?: () => void;
  onSubmit: (data: NoteFormData) => Promise<void>;
}): ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      if (isNoteFormData(data)) {
        setIsSubmitting(true);
        await onSubmit(data);

        setIsSubmitting(false);
      }
    },
    [onSubmit]
  );

  const defaultValues = note
    ? {
        noteTitle: note.title,
        noteDescription: note.note,
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Note Title" name="noteTitle" required />
      <TextArea className="mt-4" label="Note" name="noteDescription" required />
      <div
        className={clsx('flex w-full', {
          'justify-between': onCancel,
          'justify-end': !onCancel,
        })}
      >
        {onCancel && (
          <Button
            className="mt-4 w-36"
            isLoading={false}
            isSubmit={false}
            label="Cancel"
            onClick={onCancel}
          />
        )}
        <Button
          className="mt-4 w-36"
          isLoading={isSubmitting}
          label="Submit"
          isSubmit
        />
      </div>
    </Form>
  );
}
