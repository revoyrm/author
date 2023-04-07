import { gql } from 'graphql-request';

import type { Chapter } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation CreateChapter(
    $bookId: ID
    $name: String
    $number: String
    $description: String
  ) {
    chapter: createChapter(
      bookId: $bookId
      name: $name
      number: $number
      description: $description
    ) {
      book {
        id
      }
      description
      id
      name
      number
      label {
        id
      }
    }
  }
`;

type CreateChapterRequest = {
  chapter: Chapter;
};

export async function createChapter(
  bookId: string,
  name: string,
  number: string,
  description: string
): Promise<Chapter> {
  const { chapter } = await libraryClient.request<CreateChapterRequest>(query, {
    bookId,
    name,
    number,
    description,
  });

  return chapter;
}
