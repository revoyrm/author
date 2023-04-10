import { gql } from 'graphql-request';

import type { Setting } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetSettingById($id: ID) {
    setting: getSettingById(id: $id) {
      book {
        id
      }
      id
      name
      description
      label {
        id
        label
      }
    }
  }
`;

type GetSettingByIdRequest = {
  setting: Setting;
};

export async function getSettingById(id: number): Promise<Setting> {
  const { setting } = await libraryClient.request<GetSettingByIdRequest>(
    query,
    {
      id,
    }
  );

  return setting;
}
