import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation UpdateChapter(
    $updateChapterId: ID
    $name: String
    $number: Int
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
  number: number,
  description: string,
  labelId: number
): Promise<boolean> {
  const { response } = await libraryClient.request<UpdateChapterRequest>(
    query,
    {
      updateChapterId: id,
      name,
      number: Number(number),
      description,
      labelId,
    }
  );

  return response;
}
