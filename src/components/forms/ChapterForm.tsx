import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { isChapterFormData } from '../../types/forms';
import type { Chapter } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { useChapters } from '../hooks/useChapters';
import { Form } from './Form';

export function ChapterForm({
  bookId,
  chapterId,
  initialValues,
  onCancel,
  onSubmit,
}: {
  bookId: string;
  chapterId?: string;
  initialValues?: Chapter;
  onCancel?: () => void;
  onSubmit?: () => void;
}): ReactElement {
  const { getChapters, createChapter, updateChapter } = useChapters();
  const chapters = getChapters(bookId);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
            chapterNumber as string,
            chapterDescription
          );
        }
        setIsSubmitting(false);
        onSubmit?.();
      }
    },
    [chapterId, onSubmit, chapters, updateChapter, bookId, createChapter]
  );

  const defaultValues = initialValues
    ? {
        chapterName: initialValues.name,
        chapterNumber: initialValues.number,
        chapterDescription: initialValues.description,
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Chapter Title" name="chapterName" required />
      <Text
        className="mt-4"
        label="Chapter Number"
        name="chapterNumber"
        required
      />
      <TextArea
        className="mt-4"
        label="Description"
        name="chapterDescription"
        required
      />
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
