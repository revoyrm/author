import { gql } from 'graphql-request';
import { libraryClient } from './library';
import { Book } from '../types/services';

const query = gql`
  mutation createBook($title: String, $author: String, $summary: String) {
    book: createBook(title: $title, author: $author, summary: $summary) {
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

type createBookRequest = {
  book: Book;
};

export async function createBook(
  title: string,
  author: string,
  summary: string
): Promise<Book> {
  const { book } = await libraryClient.request<createBookRequest>(query, {
    title,
    author,
    summary,
  });

  return book;
}
