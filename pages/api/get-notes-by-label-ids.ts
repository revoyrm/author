import type { NextApiRequest, NextApiResponse } from 'next';

import { getNotesByLabelIds } from '../../src/services/getNotesByLabelIds';

type GetNotesBody = {
  labelIds: string[];
};

const isGetNotesBody = (maybeBody: unknown): maybeBody is GetNotesBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
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
  if (isGetNotesBody(req.body)) {
    try {
      const notes = await getNotesByLabelIds(req.body.labelIds);
      res.status(200).json(notes);
    } catch (e) {
      console.error(e);
      res.status(500).json(e);
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
