import type { ReactElement } from 'react';
import React from 'react';

import { Header } from '../../../../components/Header';

export default function Chapters(): ReactElement {
  return (
    <div className="h-full">
      <Header searchType="chapters" title="Chapters of book" showIcon />
      <div />
    </div>
  );
}
