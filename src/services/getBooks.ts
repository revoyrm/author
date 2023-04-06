import { gql } from 'graphql-request';

import type { Book } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetAllBooks {
    books: getBooks {
      id
      title
      author
      label {
        label
        id
      }
      summary
    }
  }
`;

type GetBooksRequest = {
  books: Book[];
};

export async function getAllBooks(): Promise<Book[]> {
  const { books } = await libraryClient.request<GetBooksRequest>(query);
  console.log(JSON.stringify(books, null, 2));

  return books;
}
