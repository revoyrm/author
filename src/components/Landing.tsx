import axios from 'axios';
import type { ReactElement } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import type { MultiValue } from 'react-select';

import { ApiRoutes } from '../ApiRoutes';
import { convertLabelsToDropdownOption } from '../utilities/convertLabelsToDropdownOption';
import { getAllBookLabels } from '../utilities/getAllBookLabels';
import { BookResults } from './BookResults';
import { Header } from './Header';
import { useBooks } from './hooks/useBooks';
import type { SearchResult } from './layout/SearchResults';
import { SearchResults } from './layout/SearchResults';

export function Landing(): ReactElement {
  const { books } = useBooks();
  const [searchResults, setSearchResults] = useState<
    SearchResult[] | undefined
  >();

  const searchOptions = useMemo(
    () => convertLabelsToDropdownOption(getAllBookLabels(books)),
    [books]
  );

  const handleSearch = useCallback(
    async (
      values: MultiValue<{ value: number; label: string }>
    ): Promise<void> => {
      try {
        const results = await axios.post<SearchResult[]>(
          ApiRoutes.GetSearchResults,
          {
            labelIds: values.map((val) => val.value),
          }
        );

        setSearchResults(results.data);
      } catch (e) {
        console.error(e);
        setSearchResults(undefined);
      }
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchResults(undefined);
  }, []);

  return (
    <div className="h-full">
      <Header
        searchOptions={searchOptions}
        searchType="books"
        title="Author"
        showIcon
        onClearSearch={handleClearSearch}
        onSearch={handleSearch}
      />
      {!!searchResults && <SearchResults results={searchResults} />}
      {!searchResults && <BookResults />}
    </div>
  );
}
