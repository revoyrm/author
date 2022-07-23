import type { ReactElement } from 'react';

import { Header } from '../components/Header';
import { NavigationBar } from '../components/navigation/NavigationBar';

export default function Book(): ReactElement {
  return (
    <div className="h-full">
      <Header />
      <NavigationBar />
    </div>
  );
}
