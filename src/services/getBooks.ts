import { gql } from 'graphql-request';

import type { Book } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetAllBooks {
    books: getBooks {
      id
      author
      label {
        id
        label
      }
      title
      summary
      chapters {
        id
        name
        description
        number
        label {
          id
          label
        }
      }
      characters {
        id
        name
        age
        description
        label {
          id
          label
        }
      }
      settings {
        id
        name
        description
        label {
          id
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
