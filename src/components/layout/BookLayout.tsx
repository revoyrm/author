import axios from 'axios';
import type { ReactElement } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { MultiValue } from 'react-select';

import { ApiRoutes } from '../../ApiRoutes';
import type { Book } from '../../types/services';
import { convertLabelsToDropdownOption } from '../../utilities/convertLabelsToDropdownOption';
import { getAllBookLabels } from '../../utilities/getAllBookLabels';
import { getLabelsFromBook } from '../../utilities/getLabelsFromBook';
import getSidebarItems from '../../utilities/getSidebarItems';
import { Header } from '../Header';
import { useBooks } from '../hooks/useBooks';
import { SideBar } from '../navigation/Sidebar';
import type { SearchResult } from './SearchResults';
import { SearchResults } from './SearchResults';

type BookProps = {
  bookId: string;
  book?: Book;
  searchType: string;
  heading: string;
  children?: ReactElement | ReactElement[];
  activeNav?: string;
};

export function BookLayout({
  bookId,
  book,
  searchType,
  heading,
  children,
  activeNav,
}: BookProps): ReactElement {
  const [searchResults, setSearchResults] = useState<
    SearchResult[] | undefined
  >();

  const searchOptions = useMemo(
    () => (book ? convertLabelsToDropdownOption(getLabelsFromBook(book)) : []),
    [book]
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
            bookId,
          }
        );

        setSearchResults(results.data);
      } catch (e) {
        console.error(e);
        setSearchResults(undefined);
      }
    },
    [bookId]
  );

  const handleClearSearch = useCallback(() => {
    setSearchResults(undefined);
  }, []);

  return (
    <div className="h-full">
      <Header
        searchOptions={searchOptions}
        searchType={searchType}
        title={heading}
        onClearSearch={handleClearSearch}
        onSearch={handleSearch}
      />
      <div className="flex h-full w-full items-stretch">
        <SideBar activeLabel={activeNav} items={getSidebarItems(bookId)} />
        <div className="h-[calc(100%-80px)] flex-grow overflow-y-auto overflow-x-hidden rounded-2xl bg-secondary-light pb-8">
          {!!searchResults && <SearchResults results={searchResults} />}
          {!searchResults && children}
        </div>
      </div>
    </div>
  );
}
