import type { NextApiRequest, NextApiResponse } from 'next';

import { createChapter } from '../../src/services/createChapter';

type CreateChapterBody = {
  name: string;
  number: string;
  description: string;
};

const isCreateChapterBody = (
  maybeBody: unknown
): maybeBody is CreateChapterBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'name' in maybeBody &&
    'number' in maybeBody &&
    'description' in maybeBody
  ) {
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (isCreateChapterBody(req.body)) {
    const { name, number, description } = req.body;
    try {
      const response = await createChapter(name, number, description);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
