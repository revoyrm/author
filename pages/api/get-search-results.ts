import type { NextApiRequest, NextApiResponse } from 'next';

import type { SearchResult } from '../../src/components/layout/SearchResults';
import { getBooksByLabelIds } from '../../src/services/getBooksByLabelIds';
import { getChaptersByLabelIds } from '../../src/services/getChaptersByLabelIds';
import { getCharactersByLabelIds } from '../../src/services/getCharactersByLabelIds';
import { getNotesByLabelIds } from '../../src/services/getNotesByLabelIds';
import { getSettingsByLabelIds } from '../../src/services/getSettingsByLabelIds';
import type { Chapter, Character, Setting } from '../../src/types/services';

type GetSearchResultsBody = {
  bookId?: string;
  labelIds: number[];
};

const isGetSearchResultsBody = (
  maybeBody: unknown
): maybeBody is GetSearchResultsBody => {
  if (
    maybeBody &&
    typeof maybeBody === 'object' &&
    !Array.isArray(maybeBody) &&
    'labelIds' in maybeBody
  ) {
    return true;
  }
  return false;
};

const convertToSearchResults = (
  bookId: string,
  route: SearchResult['route'],
  items?: Chapter[] | Character[] | Setting[] | null
): SearchResult[] =>
  items
    ? items.map(({ id, description, name }) => ({
        id,
        body: description,
        title: name,
        bookId,
        route,
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

    if (!bookId) {
      const books = await getBooksByLabelIds(labelIds);
      if (books) {
        const results: SearchResult[] = [];
        books.forEach(({ id, summary, title }) =>
          results.push({
            id,
            body: summary,
            title,
            bookId: String(id),
            route: 'book',
          })
        );

        res.status(200).json(results);
      }
    } else {
      const characters = await getCharactersByLabelIds(labelIds);
      const settings = await getSettingsByLabelIds(labelIds);
      const chapters = await getChaptersByLabelIds(labelIds);
      const chapterResults = convertToSearchResults(
        bookId,
        'chapters',
        chapters
      );
      const characterResults = convertToSearchResults(
        bookId,
        'characters',
        characters
      );
      const settingResults = convertToSearchResults(
        bookId,
        'settings',
        settings
      );

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
            route: 'notes',
          })
        );
      }

      res.status(200).json(results);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
