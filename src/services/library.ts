import { GraphQLClient } from 'graphql-request';

import { LIBRARY_API } from '../constants';

const libraryClient = new GraphQLClient(LIBRARY_API);

export { libraryClient };