import type { ReactElement } from 'react';

import { Text } from '../formControls/Text';

export function BookForm(): ReactElement {
  return (
    <form className="mt-4 ml-4 h-fit w-1/2  rounded-xl bg-secondary p-8">
      <Text label="Book Title" name="bookTitle" />
      <Text label="Author" name="bookAuthor" />
    </form>
  );
}
