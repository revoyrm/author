import type { NextApiRequest, NextApiResponse } from 'next';

import library from '../../mockLibrary/library.json'

import { getAllBooks } from '../../src/services/getBooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const books = await getAllBooks()
  // res.status(200).json(books);
  res.status(200).json(library.books);
}
