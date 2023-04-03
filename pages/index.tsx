import type { ReactElement } from 'react';

import { Landing } from '../src/components';
import { Book } from '../src/types/services';

type HomeProps = {
  books: Book[];
}
export default function Home({books}: HomeProps): ReactElement {
  return (
    <div className="h-full bg-paper">
      <Landing />
    </div>
  );
}
