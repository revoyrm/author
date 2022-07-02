import type { ReactElement } from 'react';

import { Landing } from '../components';

export default function Home(): ReactElement {
  return (
    <div className="bg-paper">
      <Landing />
    </div>
  );
}
