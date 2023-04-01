import type { ReactElement } from 'react';

import type { SideBarItemProps } from './SideBarItem';
import { SideBarItem } from './SideBarItem';

type SideBarProps = {
  items: SideBarItemProps[];
  activeLabel?: string;
};

export function SideBar({ items, activeLabel }: SideBarProps): ReactElement {
  return (
    <div
      className="border-1 inline-block h-full w-fit rounded-lg border-secondary 
    bg-primary"
    >
      {items.map(({ label, route }) => (
        <SideBarItem
          key={label}
          isActive={label === activeLabel}
          label={label}
          route={route}
        />
      ))}
    </div>
  );
}
