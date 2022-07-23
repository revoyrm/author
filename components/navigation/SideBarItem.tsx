import type { EventHandler, ReactElement } from 'react';

type SideBarItemProps = {
  label: string;
};

export function SideBarItem({ label }: SideBarItemProps): ReactElement {
  const onItemClick = (e: HTMLEvent): void => {};
  return (
    <div
      className="h-fit w-full min-w-[200px] border-b border-b-2 border-b-secondary bg-primary p-4 px-8 text-center"
      role="button"
      tabIndex={0}
      onClick={onItemClick}
      onKeyDown={onItemClick}
    >
      <h2 className="text-2xl font-bold text-secondary">{label}</h2>
    </div>
  );
}
