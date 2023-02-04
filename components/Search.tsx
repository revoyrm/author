import type { ReactElement } from 'react';
import { FaSearch } from 'react-icons/fa';

type SearchProps = {
  searchType: string;
};
export function Search({ searchType = 'book' }: SearchProps): ReactElement {
  return (
    <div className="flex w-1/4 justify-between rounded-lg bg-[white] p-2 text-primary">
      <input
        className="w-5/6 focus:outline-none"
        placeholder={`search ${searchType}...`}
      />
      <FaSearch className="mt-1 w-1/6" />
    </div>
  );
}
