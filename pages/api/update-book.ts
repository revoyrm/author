import type { NextApiRequest, NextApiResponse } from 'next';

import { updateBook } from '../../src/services/updateBook';

type UpdateBookBody = {
  id: number;
  title: string;
  author: string;
  summary: string;
  labelId: number;
};

const isUpdateBookBody = (maybeBody: unknown): maybeBody is UpdateBookBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'id' in maybeBody &&
    'title' in maybeBody &&
    'author' in maybeBody &&
    'summary' in maybeBody &&
    'labelId' in maybeBody
  ) {
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (isUpdateBookBody(req.body)) {
    const { id, title, author, summary, labelId } = req.body;

    try {
      const response = await updateBook(id, title, author, summary, labelId);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  }
  res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
}
