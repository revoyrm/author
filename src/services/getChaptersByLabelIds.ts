import { gql } from 'graphql-request';

import type { Chapter } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetChaptersByLabelIds($labelIds: [ID]) {
    getChaptersByLabelIds(labelIds: $labelIds) {
      id
      description
      name
      number
      book {
        id
      }
      label {
        id
        label
      }
    }
  }
`;

type GetChaptersByLabelIdsRequest = {
  chapters: Chapter[];
};

export async function getChaptersByLabelIds(
  labelIds: number[]
): Promise<Chapter[] | null> {
  const { chapters } =
    await libraryClient.request<GetChaptersByLabelIdsRequest>(query, {
      labelIds,
    });

  return chapters;
}
