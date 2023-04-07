import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation UpdateChapter(
    $updateChapterId: ID
    $name: String
    $number: String
    $description: String
    $labelId: ID
  ) {
    response: updateChapter(
      id: $updateChapterId
      name: $name
      number: $number
      description: $description
      labelId: $labelId
    )
  }
`;

type UpdateChapterRequest = {
  response: boolean;
};

export async function updateChapter(
  id: number,
  name: string,
  number: string,
  description: string,
  labelId: number
): Promise<boolean> {
  const { response } = await libraryClient.request<UpdateChapterRequest>(
    query,
    {
      updateChapterId: id,
      name,
      number,
      description,
      labelId,
    }
  );

  return response;
}
