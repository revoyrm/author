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
    updateNote(
      id: $updateNoteId
      title: $title
      note: $note
      labelIds: $labelIds
    ) {
      id
      labels {
        id
        label
      }
      title
      note
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
  const { updatedNote } = await libraryClient.request<UpdateNoteRequest>(
    query,
    {
      updateNoteId: id,
      title,
      note,
      labelIds,
    }
  );

  return updatedNote;
}
