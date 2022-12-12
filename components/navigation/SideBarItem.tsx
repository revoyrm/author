import type { ReactElement } from 'react';

type SideBarItemProps = {
  label: string;
};

export function SideBarItem({ label }: SideBarItemProps): ReactElement {
  const onItemClick = (): void => {};
  return (
    <div
      className="
        h-fit
        w-full
        min-w-[200px]
        border-b
        border-b-2
        border-b-secondary
        bg-primary-light
        p-4
        px-8
        text-center
        text-secondary
        hover:bg-secondary
        hover:text-primary
        focus:bg-secondary
        focus:text-primary"
      role="button"
      tabIndex={0}
      onClick={onItemClick}
      onKeyDown={onItemClick}
    >
      <h2 className="text-2xl font-bold">{label}</h2>
    </div>
  );
}
