import type { ReactElement } from 'react';

import { Header } from '../../../../components/Header';
import { SideBar } from '../../../../components/navigation/SideBar';

export default function Book(): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Book Name" />
      <SideBar items={[]} />
    </div>
  );
}
