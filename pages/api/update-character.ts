import type { NextApiRequest, NextApiResponse } from 'next';

import { updateCharacter } from '../../src/services/updateCharacter';

type UpdateCharacterBody = {
  id: number;
  name: string;
  age: number;
  description: string;
  labelId: number;
};

const isUpdateCharacterBody = (
  maybeBody: unknown
): maybeBody is UpdateCharacterBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'id' in maybeBody &&
    'name' in maybeBody &&
    'age' in maybeBody &&
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
  if (isUpdateCharacterBody(req.body)) {
    const { id, name, age, description, labelId } = req.body;

    try {
      const response = await updateCharacter(
        id,
        name,
        age,
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
