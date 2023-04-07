import type { NextApiRequest, NextApiResponse } from 'next';

import { createSetting } from '../../src/services/createSetting';

type CreateSettingBody = {
  name: string;
  description: string;
};

const isCreateSettingBody = (
  maybeBody: unknown
): maybeBody is CreateSettingBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'name' in maybeBody &&
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
  if (isCreateSettingBody(req.body)) {
    const { name, description } = req.body;
    try {
      const response = await createSetting(name, description);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
