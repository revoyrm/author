import type { Book, Label } from '../types/services';

// eslint-disable-next-line import/prefer-default-export
export const getLabelsFromBook = (book: Book): Label[] => {
  const labelIds = [book.label];

  book.chapters?.forEach((chapter): void => {
    labelIds.push(chapter.label);
  });
  book.characters?.forEach((character): void => {
    labelIds.push(character.label);
  });
  book.settings?.forEach((setting): void => {
    labelIds.push(setting.label);
  });

  return labelIds;
};
