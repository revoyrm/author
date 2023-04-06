export type BookFormData = {
  bookTitle: string;
  bookAuthor: string;
  bookSummary: string;
};

export const isBookFormData = (
  maybeBookFormData: unknown
): maybeBookFormData is BookFormData => {
  if (
    maybeBookFormData &&
    typeof maybeBookFormData === 'object' &&
    !Array.isArray(maybeBookFormData) &&
    'bookTitle' in maybeBookFormData &&
    'bookAuthor' in maybeBookFormData &&
    'bookSummary' in maybeBookFormData
  ) {
    return true;
  }
  return false;
};
