import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllBooks } from '../../src/services/getBooks';
import { createBook } from '../../src/services/createBook';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const { title, author, summary } = req.body;
  console.log({
    title,
    author,
    summary,
  });
  try {
    const response = await createBook(title, author, summary);

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
}
