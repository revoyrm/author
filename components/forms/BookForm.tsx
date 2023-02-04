import type { ReactElement } from 'react';

import { Button, Text, TextArea } from '../formControls';

export function BookForm(): ReactElement {
  return (
    <form className="mx-auto mt-4  h-fit w-5/6 rounded-xl bg-secondary p-8">
      <Text label="Book Title" name="bookTitle" />
      <Text className="mt-4" label="Author" name="bookAuthor" />
      <TextArea className="mt-4" label="Summary" name="bookSummary" />
      <div className="flex w-full justify-end">
        <Button className="mt-4" label="Submit" isSubmit />
      </div>
    </form>
  );
}
