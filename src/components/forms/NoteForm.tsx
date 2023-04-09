import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import type { NoteFormData } from '../../types/forms';
import { isNoteFormData } from '../../types/forms';
import type { Book, Note } from '../../types/services';
import { getDropdownOptionsFromBook } from '../../utilities/getDropdownOptionsFromBook';
import { Button, Dropdown, Text, TextArea } from '../formControls';
import { Form } from './Form';

export function NoteForm({
  book,
  note,
  onCancel,
  onSubmit,
}: {
  book?: Book;
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

  const options = useMemo(
    () => (book ? getDropdownOptionsFromBook(book) : []),
    [book]
  );

  const defaultValues = note
    ? {
        noteTitle: note.title,
        noteDescription: note.note,
        noteLabels: note.labels.map(({ id }) => String(id)),
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Note Title" name="noteTitle" required />
      <TextArea className="mt-4" label="Note" name="noteDescription" required />
      <Dropdown label="Labels" name="noteLabels" options={options} />
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
