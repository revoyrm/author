import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation($deleteChapterId: String) {
    response: deleteChapter(id: $deleteChapterId)
  }
`;

type DeleteChapterRequest = {
  response: boolean;
};

export async function deleteChapter(id: string): Promise<boolean> {
  const { response } = await libraryClient.request<DeleteChapterRequest>(
    query,
    {
      deleteChapterId: id,
    }
  );

  return response;
}
