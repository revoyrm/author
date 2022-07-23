import type { ReactElement } from 'react';

import { NavigationItem } from './NavigationItem';

export function NavigationBar(): ReactElement {
  return (
    <div className="h-full w-fit bg-primary">
      <NavigationItem />
    </div>
  );
}
