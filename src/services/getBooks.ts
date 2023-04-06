import { gql } from 'graphql-request';

import type { Book } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetAllBooks {
    books: getBooks {
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
          label
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
        label {
          label
        }
      }
    }
  }
`;

type GetBooksRequest = {
  books: Book[];
};

export async function getAllBooks(): Promise<Book[]> {
  const { books } = await libraryClient.request<GetBooksRequest>(query);

  return books;
}
