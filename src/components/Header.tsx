import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import React, { useCallback } from 'react';
import { FaBook } from 'react-icons/fa';
import type { MultiValue } from 'react-select';

import type { Book } from '../types/services';
import { Search } from './Search';

type HeaderProps = {
  title: string;
  book?: Book;
  showIcon?: boolean;
  onSearch: (
    values: MultiValue<{ value: number; label: string }>
  ) => Promise<void>;
  onClearSearch: () => void;
  searchType: string; // todo update when you know
};

export function Header({
  title,
  book,
  showIcon,
  onSearch,
  onClearSearch,
  searchType,
}: HeaderProps): ReactElement {
  const Router = useRouter();
  const goHome = useCallback((): void => {
    Router.push('/').catch(console.error);
  }, [Router]);

  return (
    <div className="flex w-full justify-between bg-primary py-8 px-4">
      <div
        className="w-3/4"
        role="button"
        tabIndex={0}
        onClick={goHome}
        onKeyDown={goHome}
      >
        {showIcon && (
          <FaBook className="mr-4 mb-3 inline-block text-3xl text-secondary" />
        )}
        <h1 className="inline-block w-1/2 text-3xl font-bold text-secondary">
          {title}
        </h1>
      </div>
      <Search
        book={book}
        searchType={searchType}
        onClearSearch={onClearSearch}
        onSearch={onSearch}
      />
    </div>
  );
}
