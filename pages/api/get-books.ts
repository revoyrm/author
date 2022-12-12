import type { NextApiRequest, NextApiResponse } from 'next';

import library from '../../mockLibrary/library.json';
import type { Book } from '../../types/library-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  await Promise.resolve(); // todo remove
  res.status(200).json(library.books);
}
