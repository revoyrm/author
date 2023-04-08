import { gql } from 'graphql-request';

import type { Book } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetBookById($id: ID) {
    book: getBookById(id: $id) {
      id
      author
      label {
        label
        id
      }
      title
      summary
      allLabels {
        label
      }
      chapters {
        name
        description
        id
        number
        label {
          id
          label
        }
      }
      characters {
        name
        label {
          id
        }
        id
        description
      }
      settings {
        name
        label {
          id
        }
        id
        description
      }
    }
  }
`;

type GetBookByIdRequest = {
  book: Book;
};

export async function getBookById(id: number): Promise<Book> {
  const { book } = await libraryClient.request<GetBookByIdRequest>(query, {
    id,
  });

  return book;
}
