import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation($deleteCharacterId: String) {
    response: deleteCharacter(id: $deleteCharacterId)
  }
`;

type DeleteCharacterRequest = {
  response: boolean;
};

export async function deleteCharacter(id: string): Promise<boolean> {
  const { response } = await libraryClient.request<DeleteCharacterRequest>(
    query,
    {
      deleteCharacterId: id,
    }
  );

  return response;
}
