import { gql } from 'graphql-request';

import { libraryClient } from './library';

const query = gql`
  mutation Mutation(
    $updateBookId: ID
    $title: String
    $author: String
    $summary: String
    $labelId: ID
  ) {
    response: updateBook(
      title: $title
      author: $author
      summary: $summary
      labelId: $labelId
      id: $updateBookId
    )
  }
`;

type UpdateBookRequest = {
  response: boolean;
};

export async function updateBook(
  id: number,
  title: string,
  author: string,
  summary: string,
  labelId: number
): Promise<boolean> {
  const { response } = await libraryClient.request<UpdateBookRequest>(query, {
    updateBookId: id,
    title,
    author,
    summary,
    labelId,
  });

  return response;
}
