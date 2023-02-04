import type { ReactElement } from 'react';

import { Button, Text, TextArea } from '../formControls';
import { Form } from './form';

export function BookForm(): ReactElement {
  return (
    <Form>
      <Text label="Book Title" name="bookTitle" />
      <Text className="mt-4" label="Author" name="bookAuthor" />
      <TextArea className="mt-4" label="Summary" name="bookSummary" />
      <div className="flex w-full justify-end">
        <Button className="mt-4" label="Submit" isSubmit />
      </div>
    </Form>
  );
}
