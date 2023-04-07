import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteCharacter } from '../../src/services/deleteCharacter';

type DeleteCharacterBody = {
  id: number;
};

const isDeleteCharacterBody = (
  maybeBody: unknown
): maybeBody is DeleteCharacterBody => {
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
  if (isDeleteCharacterBody(req.body)) {
    const { id } = req.body;

    try {
      const response = await deleteCharacter(id);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
