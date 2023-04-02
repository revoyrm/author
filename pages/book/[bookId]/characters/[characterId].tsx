import type { ReactElement } from 'react';

import { Header } from '../../../../src/components/Header';
import { SideBar } from '../../../../src/components/navigation/SideBar';

export default function Book(): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="notes" title="Book Name" />
      <SideBar items={[]} />
    </div>
  );
}
