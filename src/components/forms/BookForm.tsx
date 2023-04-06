import type { ReactElement } from 'react';
import { useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';

import { isBookFormData } from '../../types/forms';
import type { Book } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { useBooks } from '../hooks/useBooks';
import { Form } from './Form';

export function BookForm({
  initialValues,
}: {
  initialValues?: Book;
}): ReactElement {
  const { createBook, getSelectedBook, updateBook } = useBooks();
  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      console.log('i am groot', data);
      if (isBookFormData(data)) {
        const { bookTitle, bookAuthor, bookSummary } = data;
        const selectedBook = getSelectedBook();
        if (selectedBook) {
          await updateBook(selectedBook, {
            id: selectedBook.id,
            title: bookTitle,
            author: bookAuthor,
            summary: bookSummary,
          });
        } else {
          await createBook(bookTitle, bookAuthor, bookSummary);
        }
      }
    },
    [createBook, getSelectedBook, updateBook]
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
        <Button className="mt-4" label="Submit" isSubmit />
      </div>
    </Form>
  );
}
