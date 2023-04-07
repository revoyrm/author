import { gql } from 'graphql-request';

import type { Setting } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  mutation CreateSetting($bookId: String, $name: String, $description: String) {
    setting: createSetting(
      bookId: $bookId
      name: $name
      description: $description
    ) {
      book {
        id
      }
      description
      id
      label {
        id
      }
      name
    }
  }
`;

type CreateSettingRequest = {
  setting: Setting;
};

export async function createSetting(
  name: string,
  description: string
): Promise<Setting> {
  const { setting } = await libraryClient.request<CreateSettingRequest>(query, {
    name,
    description,
  });

  return setting;
}
