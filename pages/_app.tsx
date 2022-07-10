import '../styles/global.css';

import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <div className="h-full">
      <Component {...pageProps} />
    </div>
  );
}
