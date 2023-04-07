import type { NextApiRequest, NextApiResponse } from 'next';

import { createCharacter } from '../../src/services/createCharacter';

type CreateCharacterBody = {
  name: string;
  age: string;
  description: string;
};

const isCreateCharacterBody = (
  maybeBody: unknown
): maybeBody is CreateCharacterBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
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
    const { name, age, description } = req.body;
    try {
      const response = await createCharacter(name, age, description);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
