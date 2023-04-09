import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation($deleteNoteId: String) {
    response: deleteNote(id: $deleteNoteId)
  }
`;

type DeleteNoteRequest = {
  response: boolean;
};

export async function deleteNote(id: string): Promise<boolean> {
  const { response } = await libraryClient.request<DeleteNoteRequest>(query, {
    deleteNoteId: id,
  });

  return response;
}
