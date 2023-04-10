import type { NextApiRequest, NextApiResponse } from 'next';

import type { SearchResult } from '../../src/components/layout/SearchResults';
import { getAllBooks } from '../../src/services/getBooks';
import { getChaptersByLabelIds } from '../../src/services/getChaptersByLabelIds';
import { getCharactersByLabelIds } from '../../src/services/getCharactersByLabelIds';
import { getNotesByLabelIds } from '../../src/services/getNotesByLabelIds';
import { getSettingsByLabelIds } from '../../src/services/getSettingsByLabelIds';
import type { Chapter, Character, Setting } from '../../src/types/services';

type GetSearchResultsBody = {
  bookId: string;
  labelIds: number[];
};

const isGetSearchResultsBody = (
  maybeBody: unknown
): maybeBody is GetSearchResultsBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'bookId' in maybeBody &&
    'labelIds' in maybeBody &&
    typeof maybeBody.labelIds === 'object' &&
    Array.isArray(maybeBody.labelIds)
  ) {
    return true;
  }
  return false;
};

const convertToSearchResults = (
  bookId: string,
  items?: Chapter[] | Character[] | Setting[] | null
): SearchResult[] =>
  items
    ? items.map(({ id, description, name }) => ({
        id,
        body: description,
        title: name,
        bookId,
      }))
    : [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
): Promise<void> {
  if (!isGetSearchResultsBody(req.body)) {
    throw new Error('Invalid Request Body');
  }

  try {
    const { labelIds, bookId } = req.body;

    const characters = await getCharactersByLabelIds(labelIds);
    const settings = await getSettingsByLabelIds(labelIds);
    const chapters = await getChaptersByLabelIds(labelIds);
    const chapterResults = convertToSearchResults(bookId, chapters);
    const characterResults = convertToSearchResults(bookId, characters);
    const settingResults = convertToSearchResults(bookId, settings);

    const results: SearchResult[] = [
      ...characterResults,
      ...chapterResults,
      ...settingResults,
    ];

    const notes = await getNotesByLabelIds(labelIds);
    if (notes) {
      notes.forEach(({ id, note, title }) =>
        results.push({
          id,
          body: note ?? '',
          title,
          bookId,
        })
      );
    }

    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
