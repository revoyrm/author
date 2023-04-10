import type { ReactElement } from 'react';

import getSidebarItems from '../../utilities/getSidebarItems';
import { Header } from '../Header';
import { SideBar } from '../navigation/Sidebar';

type BookProps = {
  bookId: string;
  searchType: string;
  heading: string;
  children?: ReactElement | ReactElement[];
  activeNav?: string;
};

export function BookLayout({
  bookId,
  searchType,
  heading,
  children,
  activeNav,
}: BookProps): ReactElement {
  return (
    <div className="h-full">
      <Header searchType={searchType} title={heading} />
      <div className="flex h-full w-full items-stretch">
        <SideBar activeLabel={activeNav} items={getSidebarItems(bookId)} />
        <div className="h-[calc(100%-80px)] flex-grow overflow-y-auto overflow-x-hidden rounded-xl pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
