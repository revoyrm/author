import { ReactElement, useCallback } from 'react';

import { Button, Text, TextArea } from '../formControls';
import { Form } from './form';
import { FieldValues } from 'react-hook-form';

export function BookForm(): ReactElement {
  const handleSubmit = useCallback(async (data: FieldValues) => {
    console.log('i am groot', data);
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <Text label="Book Title" name="bookTitle" />
      <Text className="mt-4" label="Author" name="bookAuthor" />
      <TextArea className="mt-4" label="Summary" name="bookSummary" />
      <div className="flex w-full justify-end">
        <Button className="mt-4" label="Submit" isSubmit />
      </div>
    </Form>
  );
}
