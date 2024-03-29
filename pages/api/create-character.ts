import type { NextApiRequest, NextApiResponse } from 'next';

import { createCharacter } from '../../src/services/createCharacter';

type CreateCharacterBody = {
  bookId: string;
  name: string;
  age: number;
  description: string;
};

const isCreateCharacterBody = (
  maybeBody: unknown
): maybeBody is CreateCharacterBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'bookId' in maybeBody &&
    'name' in maybeBody &&
    'age' in maybeBody &&
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
  if (isCreateCharacterBody(req.body)) {
    const { bookId, name, age, description } = req.body;
    try {
      const response = await createCharacter(bookId, name, age, description);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
