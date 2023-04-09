import '../styles/global.css';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import type { ReactElement } from 'react';

import { AppProvider } from '../src/context/appProvider';
import { getAllBooks } from '../src/services/getBooks';
import type { Book } from '../src/types/services';

type AuthorAppProps = Pick<AppProps, 'Component' | 'pageProps'> & {
  books?: Book[];
};

export default function MyApp({
  Component,
  pageProps,
  books,
}: AuthorAppProps): ReactElement {
  return (
    <AppProvider books={books}>
      <div className="h-full">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AuthorAppProps> => {
  try {
    const initialProps = await App.getInitialProps(context);
    const books = await getAllBooks();

    // @ts-expect-error Component is passed down
    return { ...initialProps, books };
  } catch (e) {
    console.error(e);
    // @ts-expect-error Component is passed down
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...initialProps };
  }
};
