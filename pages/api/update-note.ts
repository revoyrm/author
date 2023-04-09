import type { NextApiRequest, NextApiResponse } from 'next';

import { updateNote } from '../../src/services/updateNote';

type UpdateNoteBody = {
  id: number;
  title: string;
  note: string;
  labelIds: string[];
};

const isUpdateNoteBody = (maybeBody: unknown): maybeBody is UpdateNoteBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'id' in maybeBody &&
    'title' in maybeBody &&
    'note' in maybeBody &&
    'labelIds' in maybeBody &&
    typeof maybeBody.labelIds === 'object' &&
    Array.isArray(maybeBody.labelIds)
  ) {
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (isUpdateNoteBody(req.body)) {
    const { id, title, note, labelIds } = req.body;

    try {
      const response = await updateNote(id, title, note, labelIds);

      console.log(response);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
