import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { isCharacterFormData } from '../../types/forms';
import type { Book } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { useCharacters } from '../hooks/useCharacters';
import { Form } from './Form';

export function CharacterForm({
  bookId,
  characterId,
  initialValues,
  onCancel,
  onSubmit,
}: {
  bookId: number;
  characterId?: number;
  initialValues?: Book;
  onCancel?: () => void;
  onSubmit?: () => void;
}): ReactElement {
  const { getCharacters, createCharacter, updateCharacter } = useCharacters();
  const characters = getCharacters(bookId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      if (isCharacterFormData(data)) {
        setIsSubmitting(true);
        const { characterName, characterAge, characterDescription } = data;
        if (characterId) {
          const characterToUpdate = characters.find(
            (character) => character.id === characterId
          );
          if (characterToUpdate) {
            await updateCharacter(bookId, characterToUpdate, {
              name: characterName,
              age: characterAge,
              description: characterDescription,
            });
          }
        } else {
          await createCharacter(
            bookId,
            characterName,
            characterAge,
            characterDescription
          );
        }
        setIsSubmitting(false);
        onSubmit?.();
      }
    },
    [
      characterId,
      onSubmit,
      characters,
      updateCharacter,
      bookId,
      createCharacter,
    ]
  );

  const defaultValues = initialValues
    ? {
        bookTitle: initialValues.title,
        bookAuthor: initialValues.author,
        bookSummary: initialValues.summary,
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Character Name" name="characterName" required />
      <Text
        className="mt-4"
        label="Character Age"
        name="characterAge"
        required
      />
      <TextArea
        className="mt-4"
        label="Description"
        name="characterDescription"
        required
      />
      <div
        className={clsx('flex w-full', {
          'justify-between': onCancel,
          'justify-end': !onCancel,
        })}
      >
        {onCancel && (
          <Button
            className="mt-4 w-36"
            isLoading={false}
            isSubmit={false}
            label="Cancel"
            onClick={onCancel}
          />
        )}
        <Button
          className="mt-4 w-36"
          isLoading={isSubmitting}
          label="Submit"
          isSubmit
        />
      </div>
    </Form>
  );
}
