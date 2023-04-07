import { gql } from 'graphql-request';

import type { Character } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation Mutation(
    $characterId: String
    $name: String
    $age: String
    $description: String
  ) {
    character: createCharacter(
      characterId: $characterId
      name: $name
      age: $age
      description: $description
    ) {
      age
      character {
        id
      }
      description
      id
      name
      label {
        label
        id
      }
    }
  }
`;

type CreateCharacterRequest = {
  character: Character;
};

export async function createCharacter(
  name: string,
  age: string,
  description: string
): Promise<Character> {
  const { character } = await libraryClient.request<CreateCharacterRequest>(
    query,
    {
      name,
      age,
      description,
    }
  );

  return character;
}
