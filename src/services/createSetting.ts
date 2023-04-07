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
  bookId: string,
  name: string,
  description: string
): Promise<Setting> {
  const { setting } = await libraryClient.request<CreateSettingRequest>(query, {
    bookId,
    name,
    description,
  });

  return setting;
}
