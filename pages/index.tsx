import type { ReactElement } from 'react';

import { Landing } from '../components';
import { AppProvider } from '../context/appProvider';

export default function Home(): ReactElement {
  return (
    <AppProvider>
      <div className="bg-paper">
        <Landing />
      </div>
    </AppProvider>
  );
}
