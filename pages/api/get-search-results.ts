import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllBooks } from '../../src/services/getBooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
