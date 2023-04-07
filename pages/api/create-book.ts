import type { NextApiRequest, NextApiResponse } from 'next';

import { createBook } from '../../src/services/createBook';

type CreateBookBody = {
  title: string;
  author: string;
  summary: string;
};

const isCreateBookBody = (maybeBody: unknown): maybeBody is CreateBookBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'title' in maybeBody &&
    'author' in maybeBody &&
    'summary' in maybeBody
  ) {
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (isCreateBookBody(req.body)) {
    const { title, author, summary } = req.body;
    try {
      const response = await createBook(title, author, summary);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
