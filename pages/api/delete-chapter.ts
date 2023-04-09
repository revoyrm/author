import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteChapter } from '../../src/services/deleteChapter';

type DeleteChapterBody = {
  id: string;
};

const isDeleteChapterBody = (
  maybeBody: unknown
): maybeBody is DeleteChapterBody => {
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
  if (isDeleteChapterBody(req.body)) {
    const { id } = req.body;

    try {
      const response = await deleteChapter(id);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
