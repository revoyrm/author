import type { NextApiRequest, NextApiResponse } from 'next';

import { updateSetting } from '../../src/services/updateSetting';

type UpdateSettingBody = {
  id: number;
  name: string;
  age: string;
  description: string;
  labelId: number;
};

const isUpdateSettingBody = (
  maybeBody: unknown
): maybeBody is UpdateSettingBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'id' in maybeBody &&
    'name' in maybeBody &&
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
  if (isUpdateSettingBody(req.body)) {
    const { id, name, description, labelId } = req.body;

    try {
      const response = await updateSetting(id, name, description, labelId);

      res.status(200).json(response);
    } catch (e) {
      console.error(e);
      res.status(500).json({ e });
    }
  } else {
    res.status(400).json({ message: 'BAD_REQUEST: Invalid req body' });
  }
}
