import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation(
    $updateCharacterId: ID
    $name: String
    $age: String
    $description: String
    $labelId: ID
  ) {
    response: updateCharacter(
      id: $updateCharacterId
      name: $name
      age: $age
      description: $description
      labelId: $labelId
    )
  }
`;

type UpdateCharacterRequest = {
  response: boolean;
};

export async function updateCharacter(
  id: number,
  name: string,
  age: string,
  description: string,
  labelId: number
): Promise<boolean> {
  const { response } = await libraryClient.request<UpdateCharacterRequest>(
    query,
    {
      updateCharacterId: id,
      name,
      age,
      description,
      labelId,
    }
  );

  return response;
}
