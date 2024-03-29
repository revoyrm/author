import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation($deleteNoteId: ID) {
    response: deleteNote(id: $deleteNoteId)
  }
`;

type DeleteNoteRequest = {
  response: boolean;
};

export async function deleteNote(id: number): Promise<boolean> {
  const { response } = await libraryClient.request<DeleteNoteRequest>(query, {
    deleteNoteId: id,
  });

  return response;
}
