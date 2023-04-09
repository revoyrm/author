import '../styles/global.css';

import axios from 'axios';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import type { ReactElement } from 'react';

import { ApiRoutes } from '../src/ApiRoutes';
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
  const initialProps = await App.getInitialProps(context);

  const isClientSide = typeof window !== 'undefined';

  try {
    let books: Book[] = [];
    if (isClientSide) {
      books = await axios.get(ApiRoutes.GetBooks);
    } else {
      books = await getAllBooks();
    }

    // @ts-expect-error Component is passed down
    return { ...initialProps, books };
  } catch (e) {
    console.error(JSON.stringify(e, null, 2));
    // @ts-expect-error Component is passed down
    return { ...initialProps };
  }
};
