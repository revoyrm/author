import type { ReactElement } from 'react';
import { Header } from '../Header';
import { SideBar } from '../navigation/SideBar';
import getSidebarItems from '../../../pages/utilities/getSidebarItems';

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
        <div className="inline-block h-full flex-grow rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
