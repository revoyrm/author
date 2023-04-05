import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteBook } from '../../src/services/deleteBook';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  const { id } = req.body;
  console.log({
    id,
  });
  try {
    const response = await deleteBook(id);

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
}
