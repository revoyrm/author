import type { ReactElement } from 'react';

import { Landing } from '../components';
import { AppProvider } from '../context/appProvider';

export default function Home(): ReactElement {
  return (
    <AppProvider>
      <div className="h-full bg-paper">
        <Landing />
      </div>
    </AppProvider>
  );
}
