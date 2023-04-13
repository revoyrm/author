import { gql } from 'graphql-request';

import type { Book } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetBooksByLabelIds($labelIds: [ID]) {
    getBooksByLabelIds(labelIds: $labelIds) {
      id
      title
      summary
      label {
        id
        label
      }
    }
  }
`;

type GetBooksByLabelIdsRequest = {
  books: Book[];
};

export async function getBooksByLabelIds(
  labelIds: number[]
): Promise<Book[] | null> {
  const { books } = await libraryClient.request<GetBooksByLabelIdsRequest>(
    query,
    {
      labelIds,
    }
  );

  return books;
}
