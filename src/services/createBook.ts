import { gql } from 'graphql-request';

import type { Book } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation createBook($title: String, $author: String, $summary: String) {
    book: createBook(title: $title, author: $author, summary: $summary) {
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

type CreateBookRequest = {
  book: Book;
};

export async function createBook(
  title: string,
  author: string,
  summary: string
): Promise<Book> {
  const { book } = await libraryClient.request<CreateBookRequest>(query, {
    title,
    author,
    summary,
  });

  return book;
}
