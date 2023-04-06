import { ReactElement, useState } from 'react';
import { useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';

import { getBookWithId } from '../../../pages/utilities/getBookWithId';
import { isBookFormData } from '../../types/forms';
import type { Book } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { useBooks } from '../hooks/useBooks';
import { Form } from './Form';

export function BookForm({
  bookId,
  initialValues,
}: {
  bookId?: number;
  initialValues?: Book;
}): ReactElement {
  const { books, createBook, updateBook } = useBooks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      if (isBookFormData(data)) {
        setIsSubmitting(true);
        const { bookTitle, bookAuthor, bookSummary } = data;
        if (bookId) {
          const bookToUpdate = getBookWithId(bookId, books);
          if (bookToUpdate) {
            await updateBook(bookToUpdate, {
              id: bookId,
              title: bookTitle,
              author: bookAuthor,
              summary: bookSummary,
            });
          }
        } else {
          await createBook(bookTitle, bookAuthor, bookSummary);
        }
        setIsSubmitting(false);
      }
    },
    [bookId, books, createBook, updateBook]
  );

  const defaultValues = initialValues
    ? {
        bookTitle: initialValues.title,
        bookAuthor: initialValues.author,
        bookSummary: initialValues.summary,
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Book Title" name="bookTitle" required />
      <Text className="mt-4" label="Author" name="bookAuthor" required />
      <TextArea className="mt-4" label="Summary" name="bookSummary" required />
      <div className="flex w-full justify-end">
        <Button
          className="mt-4"
          isLoading={isSubmitting}
          label="Submit"
          isSubmit
        />
      </div>
    </Form>
  );
}
