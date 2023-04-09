import type { Book } from '../types/services';

// eslint-disable-next-line import/prefer-default-export
export const getAllLabelIdsFromBook = (book: Book): number[] => {
  const labelIds = [book.label.id];

  book.chapters?.forEach((chapter): void => {
    labelIds.push(chapter.label.id);
  });
  book.characters?.forEach((character): void => {
    labelIds.push(character.label.id);
  });
  book.settings?.forEach((setting): void => {
    labelIds.push(setting.label.id);
  });

  return labelIds;
};
