import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import { useCallback, useContext } from 'react';

import { getBookIdxWithId } from '../../../pages/utilities/getBookIdxWithId';
import { getBookWithId } from '../../../pages/utilities/getBookWithId';
import { ApiRoutes } from '../../ApiRoutes';
import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book, Setting } from '../../types/services';

type UseSettingsType = {
  getSettings: (bookId: string) => Setting[];
  updateSetting: (
    bookId: string,
    oldSetting: Setting,
    newSetting: Pick<Setting, 'description' | 'name'>
  ) => Promise<void>;
  createSetting: (
    bookId: string,
    name: string,
    description: string
  ) => Promise<void>;
  deleteSetting: (bookId: string, id: number) => Promise<void>;
};

const isSetting = (maybeSetting: unknown): maybeSetting is Setting => {
  if (
    maybeSetting &&
    typeof maybeSetting === 'object' &&
    !Array.isArray(maybeSetting) &&
    'id' in maybeSetting &&
    'name' in maybeSetting &&
    'description' in maybeSetting
  ) {
    return true;
  }
  return false;
};

export const useSettings = (): UseSettingsType => {
  const { state, dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    throw new Error('useBooks must be used within an AppProvider');
  }

  const getClonedSettingsFromBook = useCallback(
    (bookId: string): Setting[] => {
      try {
        const { books } = state ?? {};
        if (!books) throw new Error('The current book does not exist');

        const currentBookIdx = getBookIdxWithId(bookId, books);
        if (currentBookIdx === -1)
          throw new Error('The current book does not exist');

        const { settings } = books[currentBookIdx];

        return _cloneDeep(settings ?? []);
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [state]
  );

  const getBooksWithUpdatedSettings = useCallback(
    (bookId: string, newSettings: Setting[]): Book[] => {
      try {
        const { books } = state ?? {};
        if (!books) throw new Error('The current book does not exist');

        const currentBookIdx = getBookIdxWithId(bookId, books);
        if (currentBookIdx === -1)
          throw new Error('The current book does not exist');

        const updatedBooks = _cloneDeep(books);
        updatedBooks[currentBookIdx].settings = newSettings;

        return updatedBooks;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [state]
  );

  const updateSetting = useCallback(
    async (
      bookkId: string,
      oldSetting: Setting,
      newSetting: Pick<Setting, 'description' | 'name'>
    ): Promise<void> => {
      const settings = getClonedSettingsFromBook(bookkId);

      const idx = settings.findIndex((setting) => setting.id === oldSetting.id);

      if (idx > -1) {
        settings[idx] = {
          ...oldSetting,
          name: newSetting.name,
          description: newSetting.description,
        };

        const settingToUpdate = settings[idx];

        try {
          await axios.post(ApiRoutes.UpdateSetting, {
            id: settingToUpdate.id,
            name: settingToUpdate.name,
            description: settingToUpdate.description,
            labelId: settingToUpdate.label.id,
          });
        } catch (e) {
          console.error(e);
        }

        const updatedBooks = getBooksWithUpdatedSettings(bookkId, settings);

        dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
      }
    },
    [dispatch, getBooksWithUpdatedSettings, getClonedSettingsFromBook]
  );

  const createSetting = useCallback(
    async (bookId: string, name: string, description: string) => {
      try {
        const settings = getClonedSettingsFromBook(bookId);

        const response = await axios.post(ApiRoutes.CreateSetting, {
          bookId,
          name,
          description,
        });

        if (isSetting(response.data)) {
          settings.push(response.data);

          const updatedBooks = getBooksWithUpdatedSettings(bookId, settings);

          dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, getBooksWithUpdatedSettings, getClonedSettingsFromBook]
  );

  const deleteSetting = useCallback(
    async (bookId: string, id: number): Promise<void> => {
      try {
        const settings = getClonedSettingsFromBook(bookId);

        const response = await axios.post(ApiRoutes.DeleteSetting, { id });

        if (response.data) {
          const newSettings = settings.filter((setting) => setting.id !== id);
          const updatedBooks = getBooksWithUpdatedSettings(bookId, newSettings);
          dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, getBooksWithUpdatedSettings, getClonedSettingsFromBook]
  );

  const getSettings = (bookId: string): Setting[] => {
    const { books } = state ?? {};

    const currentBook = getBookWithId(bookId, books ?? []);

    if (!currentBook) return [];

    const { settings } = currentBook;

    return settings ?? [];
  };

  return {
    getSettings,
    updateSetting,
    createSetting,
    deleteSetting,
  };
};
