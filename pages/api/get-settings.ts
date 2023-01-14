import type { NextApiRequest, NextApiResponse } from 'next';

import library from '../../mockLibrary/library.json';
import { getBookWithId } from '../utilities/get-book-with-id';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  await Promise.resolve(); // todo remove
  const { bookId } = req.body as { bookId: number };
  const book = getBookWithId(bookId, library.books);
  res.status(200).json(book?.settings ?? []);
}
