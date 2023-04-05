import { gql } from 'graphql-request';
import { libraryClient } from './library';
import { Book } from '../types/services';

const query = gql`
  mutation Mutation($deleteBookId: String) {
    deleteBook(id: $deleteBookId)
  }
`;

type deleteBookRequest = {
  deleteBook: boolean;
};

export async function deleteBook(id: string): Promise<boolean> {
  const { deleteBook } = await libraryClient.request<deleteBookRequest>(query, {
    id,
  });

  return deleteBook;
}
