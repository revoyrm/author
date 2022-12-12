import type { NextApiRequest, NextApiResponse } from 'next';

import library from '../../mockLibrary/library.json';
import type { Book } from '../../types/library-types';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<Book[]> {
  return library.books;
}
