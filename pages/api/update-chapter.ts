import type { NextApiRequest, NextApiResponse } from 'next';

import { updateChapter } from '../../src/services/updateChapter';

type UpdateChapterBody = {
  id: number;
  name: string;
  number: number;
  description: string;
  labelId: number;
};

const isUpdateChapterBody = (
  maybeBody: unknown
): maybeBody is UpdateChapterBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'id' in maybeBody &&
    'name' in maybeBody &&
    'number' in maybeBody &&
    'description' in maybeBody &&
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
  if (isUpdateChapterBody(req.body)) {
    const { id, name, number, description, labelId } = req.body;

    try {
      const response = await updateChapter(
        id,
        name,
        number,
        description,
        labelId
      );

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
