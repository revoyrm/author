import { gql } from 'graphql-request';

import type { Note } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation Mutation($title: String, $note: String, $labelIds: [ID]) {
    createdNote: createNote(title: $title, note: $note, labelIds: $labelIds) {
      id
      note
      title
      labels {
        id
        label
      }
    }
  }
`;

type CreateNoteRequest = {
  createdNote: Note;
};

export async function createNote(
  title: string,
  note: string,
  labelIds: string[]
): Promise<Note> {
  const { createdNote } = await libraryClient.request<CreateNoteRequest>(
    query,
    {
      title,
      note,
      labelIds,
    }
  );

  return createdNote;
}
