import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation UpdateNote(
    $title: String
    $note: String
    $updateNoteId: ID
    $labelIds: [ID]
  ) {
    response: updateNote(
      id: $updateNoteId
      title: $title
      note: $note
      labelIds: $labelIds
    )
  }
`;

type UpdateNoteRequest = {
  response: boolean;
};

export async function updateNote(
  id: number,
  title: string,
  note: string,
  labelIds: string[]
): Promise<boolean> {
  const { response } = await libraryClient.request<UpdateNoteRequest>(query, {
    updateNoteId: id,
    title,
    note,
    labelIds,
  });

  return response;
}
