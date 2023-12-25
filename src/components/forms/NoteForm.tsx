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
import { useNotes } from '../hooks/useNotes';

export function NoteForm({
  book,
  note,
  noteId,
  initialLabels,
  onCancel,
  onSubmit,
}: {
  book?: Book;
  note?: Note;
  initialLabels?: string[];
  onCancel?: () => void;
  onSubmit: (id: NoteFormData) => Promise<void>;
}): ReactElement {
  // const { getNotes, createNotes, updateNote } = useNotes();
  // const notes = getNotes(bookId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
  
  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      if (isChapterFormData(data)) {
        setIsSubmitting(true);
        const { chapterName, chapterNumber, chapterDescription } = data;
        if (chapterId) {
          const chapterToUpdate = chapters.find(
            (chapter) => String(chapter.id) === chapterId
          );
          if (chapterToUpdate) {
            await updateChapter(bookId, chapterToUpdate, {
              name: chapterName,
              number: chapterNumber,
              description: chapterDescription,
            });
          }
        } else {
          await createChapter(
            bookId,
            chapterName,
            chapterNumber,
            chapterDescription
          );
        }
        setIsSubmitting(false);
        onSubmit?.();
      }
    },
    [chapterId, onSubmit, chapters, updateChapter, bookId, createChapter]
  );
  */
  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      if (isNoteFormData(data)) {
        setIsSubmitting(true);
        await onSubmit(data);
        // if (noteId) {
        //   const chapterToUpdate = chapters.find(
        //     (chapter) => String(chapter.id) === chapterId
        //   );
        //   if (chapterToUpdate) {
        //     await updateChapter(bookId, chapterToUpdate, {
        //       name: chapterName,
        //       number: chapterNumber,
        //       description: chapterDescription,
        //     });
        //   }
        // } else {
        //   await createChapter(
        //     bookId,
        //     chapterName,
        //     chapterNumber,
        //     chapterDescription
        //   );
        // }
        // setIsSubmitting(false);
        // onSubmit?.();

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
    : {
        noteLabels: initialLabels ?? [],
      };

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
