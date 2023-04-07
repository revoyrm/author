import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation($deleteSettingId: String) {
    response: deleteSetting(id: $deleteSettingId)
  }
`;

type DeleteSettingRequest = {
  response: boolean;
};

export async function deleteSetting(id: number): Promise<boolean> {
  const { response } = await libraryClient.request<DeleteSettingRequest>(
    query,
    {
      id,
    }
  );

  return response;
}
