import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteBook } from '../../src/services/deleteBook';

type DeleteBookBody = {
  id: number;
};

const isDeleteBookBody = (maybeBody: unknown): maybeBody is DeleteBookBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'id' in maybeBody
  ) {
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (isDeleteBookBody(req.body)) {
    const { id } = req.body;

    try {
      const response = await deleteBook(id);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
