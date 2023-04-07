import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteSetting } from '../../src/services/deleteSetting';

type DeleteSettingBody = {
  id: number;
};

const isDeleteSettingBody = (
  maybeBody: unknown
): maybeBody is DeleteSettingBody => {
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
  if (isDeleteSettingBody(req.body)) {
    const { id } = req.body;

    try {
      const response = await deleteSetting(id);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
