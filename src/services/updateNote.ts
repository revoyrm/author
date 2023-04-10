import { gql } from 'graphql-request';

import type { Note } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation Mutation(
    $updateNoteId: ID
    $title: String
    $note: String
    $labelIds: [String]
  ) {
    updatedNote: updateNote(
      id: $updateNoteId
      title: $title
      note: $note
      labelIds: $labelIds
    ) {
      id
      title
      note
      labels {
        id
        label
      }
    }
  }
`;

type UpdateNoteRequest = {
  updatedNote: Note;
};

export async function updateNote(
  id: number,
  title: string,
  note: string,
  labelIds: string[]
): Promise<Note> {
  console.log('ID', id);
  const { updatedNote } = await libraryClient.request<UpdateNoteRequest>(
    query,
    {
      updateNoteId: Number(id),
      title,
      note,
      labelIds,
    }
  );

  return updatedNote;
}
