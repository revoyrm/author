import { gql } from 'graphql-request';
import { libraryClient } from './library';
import { Book } from '../types/services';

const query = gql`
  query GetAllBooks {
    books: getBooks {
      id
      title
      author
      label {
        label
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

  return books ?? [];
}
