import { gql } from 'graphql-request';

import type { Character } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetCharactersByLabelIds($labelIds: [ID]) {
    getCharactersByLabelIds(labelIds: $labelIds) {
      id
      description
      name
      age
      book {
        id
      }
      label {
        id
        label
      }
    }
  }
`;

type GetCharactersByLabelIdsRequest = {
  Characters: Character[];
};

export async function getCharactersByLabelIds(
  labelIds: number[]
): Promise<Character[] | null> {
  const { Characters } =
    await libraryClient.request<GetCharactersByLabelIdsRequest>(query, {
      labelIds,
    });

  return Characters;
}
