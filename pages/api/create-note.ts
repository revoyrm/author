import type { NextApiRequest, NextApiResponse } from 'next';

import { createNote } from '../../src/services/createNote';

type CreateNoteBody = {
  title: string;
  note: string;
  labelIds: string[];
};

const isCreateNoteBody = (maybeBody: unknown): maybeBody is CreateNoteBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'title' in maybeBody &&
    'note' in maybeBody &&
    'labelIds' in maybeBody
  ) {
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (isCreateNoteBody(req.body)) {
    const { title, note, labelIds } = req.body;
    try {
      const response = await createNote(title, note, labelIds);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
