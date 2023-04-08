import { gql } from 'graphql-request';

import type { Chapter } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetChapterById($id: ID) {
    chapter: getChapterById(id: $id) {
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

type GetChapterByIdRequest = {
  chapter: Chapter;
};

export async function getChapterById(id: number): Promise<Chapter> {
  const { chapter } = await libraryClient.request<GetChapterByIdRequest>(
    query,
    {
      id,
    }
  );

  return chapter;
}
