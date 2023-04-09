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

export type ChapterFormData = {
  chapterName: string;
  chapterNumber: number;
  chapterDescription: string;
};

export const isChapterFormData = (
  maybeChapterFormData: unknown
): maybeChapterFormData is ChapterFormData => {
  if (
    maybeChapterFormData &&
    typeof maybeChapterFormData === 'object' &&
    !Array.isArray(maybeChapterFormData) &&
    'chapterName' in maybeChapterFormData &&
    'chapterNumber' in maybeChapterFormData &&
    'chapterDescription' in maybeChapterFormData
  ) {
    return true;
  }
  return false;
};

export type CharacterFormData = {
  characterName: string;
  characterAge: string;
  characterDescription: string;
};

export const isCharacterFormData = (
  maybeCharacterFormData: unknown
): maybeCharacterFormData is CharacterFormData => {
  if (
    maybeCharacterFormData &&
    typeof maybeCharacterFormData === 'object' &&
    !Array.isArray(maybeCharacterFormData) &&
    'characterName' in maybeCharacterFormData &&
    'characterAge' in maybeCharacterFormData &&
    'characterDescription' in maybeCharacterFormData
  ) {
    return true;
  }
  return false;
};

export type SettingFormData = {
  settingName: string;
  settingDescription: string;
};

export const isSettingFormData = (
  maybeSettingFormData: unknown
): maybeSettingFormData is SettingFormData => {
  if (
    maybeSettingFormData &&
    typeof maybeSettingFormData === 'object' &&
    !Array.isArray(maybeSettingFormData) &&
    'settingName' in maybeSettingFormData &&
    'settingDescription' in maybeSettingFormData
  ) {
    return true;
  }
  return false;
};
