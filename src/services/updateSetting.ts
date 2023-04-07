import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation UpdateSetting(
    $updateSettingId: ID
    $name: String
    $number: String
    $description: String
    $labelId: ID
  ) {
    response: updateSetting(
      id: $updateSettingId
      name: $name
      number: $number
      description: $description
      labelId: $labelId
    )
  }
`;

type UpdateSettingRequest = {
  response: boolean;
};

export async function updateSetting(
  id: number,
  name: string,
  description: string,
  labelId: number
): Promise<boolean> {
  const { response } = await libraryClient.request<UpdateSettingRequest>(
    query,
    {
      updateSettingId: id,
      name,
      description,
      labelId,
    }
  );

  return response;
}
