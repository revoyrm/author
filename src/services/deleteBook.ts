import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation($deleteBookId: String) {
    response: deleteBook(id: $deleteBookId)
  }
`;

type DeleteBookRequest = {
  response: boolean;
};

export async function deleteBook(id: number): Promise<boolean> {
  const { response } = await libraryClient.request<DeleteBookRequest>(query, {
    id,
  });

  return response;
}
