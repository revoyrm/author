import type { ReactElement } from 'react';

import { SideBarItem } from './SideBarItem';

const labels = ['Characters', 'Settings', 'Chapters', 'Notes'];

export function SideBar(): ReactElement {
  return (
    <div
      className="border-1 h-full w-fit rounded-lg border-secondary 
    bg-primary-light"
    >
      {labels.map((label) => (
        <SideBarItem key={label} label={label} />
      ))}
    </div>
  );
}
