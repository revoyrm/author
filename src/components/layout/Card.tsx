import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

export function Card({
  onKeyDown,
  onClick,
  children,
}: {
  onKeyDown: KeyboardEventHandler;
  onClick: MouseEventHandler;
  children: ReactNode;
}): ReactElement {
  return (
    <div
      className="
        m-2
        flex
        h-52
        w-60
        flex-col 
        rounded-lg 
        border-2 
        border-primary
        bg-secondary
        p-2
        text-primary
        hover:border-4
        hover:border-primary-light
        focus:border-4
        focus:border-primary-light"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}
