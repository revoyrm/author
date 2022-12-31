import type { ReactElement } from 'react';

import type { SideBarItemProps } from './SideBarItem';
import { SideBarItem } from './SideBarItem';

type SideBarProps = {
  items: SideBarItemProps[];
};

export function SideBar({ items }: SideBarProps): ReactElement {
  return (
    <div
      className="border-1 h-full w-fit rounded-lg border-secondary 
    bg-primary-light"
    >
      <SideBarItem key="Back" label="Back" />
      {items.map(({ label, route }) => (
        <SideBarItem key={label} label={label} route={route} />
      ))}
    </div>
  );
}
