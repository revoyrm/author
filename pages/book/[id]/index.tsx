import type { NextPageContext } from 'next';
import Router from 'next/router';
import type { ReactElement } from 'react';

import { Header } from '../../../components/Header';
import { SideBar } from '../../../components/navigation/SideBar';

type BookProps = {
  currentBookId: string;
};

export default function Book({ currentBookId }: BookProps): ReactElement {
  const onBack = (): void => {
    Router.push('/').catch(console.error);
  };

  const sidebarItems: {
    label: string;
    route?: string;
  }[] = [
    {
      label: 'Home',
      route: `/`,
    },
    {
      label: 'Characters',
      route: `/book/${currentBookId}/characters`,
    },
    { label: 'Settings', route: `/book/${currentBookId}/settings` },
    { label: 'Chapters', route: `/book/${currentBookId}/chapters` },
    { label: 'Notes', route: `/book/${currentBookId}/notes` },
  ];

  return (
    <div className="h-full">
      <Header searchType="book" title="Book Name" />
      <SideBar items={sidebarItems} />
    </div>
  );
}

export function getServerSideProps(context: NextPageContext): {
  props: BookProps;
} {
  console.log({ context });
  return {
    props: {
      currentBookId: context.query.id as string,
    }, // will be passed to the page component as props
  };
}
