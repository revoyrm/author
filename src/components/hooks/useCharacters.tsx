import axios from 'axios';
import _cloneDeep from 'lodash/cloneDeep';
import { useCallback, useContext } from 'react';

import { getBookIdxWithId } from '../../../pages/utilities/getBookIdxWithId';
import { getBookWithId } from '../../../pages/utilities/getBookWithId';
import { ApiRoutes } from '../../ApiRoutes';
import { Actions } from '../../context/actions';
import { AppContext } from '../../context/appProvider';
import type { Book, Chapter, Character } from '../../types/services';

type UseCharactersType = {
  getCharacters: (bookId: number) => Character[];
  updateCharacter: (
    bookkId: number,
    oldCharacter: Character,
    newCharacter: Character
  ) => Promise<void>;
  createCharacter: (
    bookId: number,
    id: number,
    name: string,
    age: string,
    description: string
  ) => Promise<void>;
  deleteCharacter: (bookId: number, id: number) => Promise<void>;
};

const isCharacter = (maybeCharacter: unknown): maybeCharacter is Character => {
  if (
    maybeCharacter &&
    typeof maybeCharacter === 'object' &&
    !Array.isArray(maybeCharacter) &&
    'id' in maybeCharacter &&
    'age' in maybeCharacter &&
    'number' in maybeCharacter &&
    'description' in maybeCharacter
  ) {
    return true;
  }
  return false;
};

export const useCharacters = (): UseCharactersType => {
  const { state, dispatch } = useContext(AppContext) ?? {};

  if (!dispatch) {
    throw new Error('useBooks must be used within an AppProvider');
  }

  const getClonedCharactersFromBook = useCallback(
    (bookId: number): Character[] => {
      try {
        const { books } = state ?? {};
        if (!books) throw new Error('The current book does not exist');

        const currentBookIdx = getBookIdxWithId(bookId, books);
        if (currentBookIdx === -1)
          throw new Error('The current book does not exist');

        const { characters } = books[currentBookIdx];

        return _cloneDeep(characters ?? []);
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [state]
  );

  const getBooksWithUpdatedCharacters = useCallback(
    (bookId: number, newCharacters: Character[]): Book[] => {
      try {
        const { books } = state ?? {};
        if (!books) throw new Error('The current book does not exist');

        const currentBookIdx = getBookIdxWithId(bookId, books);
        if (currentBookIdx === -1)
          throw new Error('The current book does not exist');

        const updatedBooks = _cloneDeep(books);
        updatedBooks[currentBookIdx].characters = newCharacters;

        return updatedBooks;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    [state]
  );

  const updateCharacter = useCallback(
    async (
      bookkId: number,
      oldCharacter: Character,
      newCharacter: Character
    ): Promise<void> => {
      const characters = getClonedCharactersFromBook(bookkId);

      const idx = characters.findIndex(
        (character) => character.id === oldCharacter.id
      );

      if (idx > -1) {
        characters[idx] = {
          ...oldCharacter,
          name: newCharacter.name,
          age: newCharacter.age,
          description: newCharacter.description,
        };

        const characterToUpdate = characters[idx];

        try {
          await axios.post(ApiRoutes.UpdateCharacter, {
            id: characterToUpdate.id,
            name: characterToUpdate.name,
            age: characterToUpdate.age,
            description: characterToUpdate.description,
            labelId: characterToUpdate.label.id,
          });
        } catch (e) {
          console.error(e);
        }

        const updatedBooks = getBooksWithUpdatedCharacters(bookkId, characters);

        dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
      }
    },
    [dispatch, getBooksWithUpdatedCharacters, getClonedCharactersFromBook]
  );

  const createCharacter = useCallback(
    async (
      bookId: number,
      id: number,
      name: string,
      number: string,
      description: string
    ) => {
      try {
        const characters = getClonedCharactersFromBook(bookId);

        const response = await axios.post(ApiRoutes.CreateChapter, {
          name,
          number,
          description,
        });

        if (isCharacter(response.data)) {
          characters.push(response.data);

          const updatedBooks = getBooksWithUpdatedCharacters(
            bookId,
            characters
          );

          dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, getBooksWithUpdatedCharacters, getClonedCharactersFromBook]
  );

  const deleteCharacter = useCallback(
    async (bookId: number, id: number): Promise<void> => {
      try {
        const characters = getClonedCharactersFromBook(bookId);

        const response = await axios.post(ApiRoutes.DeleteCharacter, { id });

        if (response.data) {
          const newCharacters = characters.filter(
            (character) => character.id !== id
          );
          const updatedBooks = getBooksWithUpdatedCharacters(
            bookId,
            newCharacters
          );
          dispatch({ type: Actions.UpdateBooks, payload: updatedBooks });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, getBooksWithUpdatedCharacters, getClonedCharactersFromBook]
  );

  const getCharacters = (bookId: number): Character[] => {
    const { books } = state ?? {};

    const currentBook = getBookWithId(bookId, books ?? []);

    if (!currentBook) return [];

    const { characters } = currentBook;

    return characters ?? [];
  };

  return {
    getCharacters,
    updateCharacter,
    createCharacter,
    deleteCharacter,
  };
};
