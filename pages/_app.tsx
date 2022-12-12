import '../styles/global.css';

import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

import { AppProvider } from '../context/appProvider';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <AppProvider>
      <div className="h-full">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}
