import { gql } from 'graphql-request';

import type { Setting } from '../types/services';
import { libraryClient } from './library';

const query = gql`
  query GetSettingsByLabelIds($labelIds: [ID]) {
    getSettingsByLabelIds(labelIds: $labelIds) {
      id
      description
      name
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

type GetSettingsByLabelIdsRequest = {
  settings: Setting[];
};

export async function getSettingsByLabelIds(
  labelIds: number[]
): Promise<Setting[] | null> {
  const { settings } =
    await libraryClient.request<GetSettingsByLabelIdsRequest>(query, {
      labelIds,
    });

  return settings;
}
