import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllBooks } from '../../src/services/get-books';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const books = await getAllBooks()
  res.status(200).json(books);
}
