import { gql } from 'graphql-request';

import type { Note } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetNotesByLabelIds($labelIds: [ID]) {
    notes: getNotesByLabelIds(labelIds: $labelIds) {
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

type GetNotesRequest = {
  notes: Note[] | null;
};

export async function getNotesByLabelIds(
  labelIds: number[]
): Promise<Note[] | null> {
  const { notes } = await libraryClient.request<GetNotesRequest>(query, {
    labelIds,
  });

  return notes;
}
