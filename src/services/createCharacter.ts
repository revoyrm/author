import { gql } from 'graphql-request';

import type { Character } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation Mutation(
    $bookId: String
    $name: String
    $age: Int
    $description: String
  ) {
    character: createCharacter(
      bookId: $bookId
      name: $name
      age: $age
      description: $description
    ) {
      book {
        id
      }
      age
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
  bookId: string,
  name: string,
  age: number,
  description: string
): Promise<Character> {
  const { character } = await libraryClient.request<CreateCharacterRequest>(
    query,
    {
      bookId,
      name,
      age: Number(age),
      description,
    }
  );

  return character;
}
