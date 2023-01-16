import type { ReactElement } from 'react';
import React from 'react';
import { FaBook } from 'react-icons/fa';

import { Search } from './Search';

type HeaderProps = {
  title: string;
  showIcon?: boolean;
  searchType: string; // todo update when you know
};

export function Header({
  title,
  showIcon,
  searchType,
}: HeaderProps): ReactElement {
  return (
    <div className="flex w-full justify-between bg-primary py-8 px-4">
      <div className="w-3/4 ">
        {showIcon && (
          <FaBook className="mr-4 mb-3 inline-block text-3xl text-secondary" />
        )}
        <h1 className="inline-block w-1/2 text-3xl font-bold text-secondary">
          {title}
        </h1>
      </div>
      <Search searchType={searchType} />
    </div>
  );
}
