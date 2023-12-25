import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { isSettingFormData } from '../../types/forms';
import type { Book, Setting } from '../../types/services';
import { Button, Text, TextArea } from '../formControls';
import { useSettings } from '../hooks/useSettings';
import { Form } from './Form';

export function SettingForm({
  bookId,
  settingId,
  initialValues,
  onCancel,
  onSubmit,
}: {
  bookId: string;
  settingId?: string;
  initialValues?: Setting;
  onCancel?: () => void;
  onSubmit?: (id?: string) => void;
}): ReactElement {
  const { getSettings, createSetting, updateSetting } = useSettings();
  const settings = getSettings(bookId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: FieldValues) => {
      let id;
      if (isSettingFormData(data)) {
        setIsSubmitting(true);
        const { settingName, settingDescription } = data;
        if (settingId) {
          const settingToUpdate = settings.find(
            (setting) => String(setting.id) === settingId
          );
          if (settingToUpdate) {
            await updateSetting(bookId, settingToUpdate, {
              name: settingName,
              description: settingDescription,
            });
          }
        } else {
          const resp = await createSetting(
            bookId,
            settingName,
            settingDescription
          );
          console.log(resp);
          id = resp.id;
        }
        setIsSubmitting(false);
        onSubmit?.(id);
      }
    },
    [settingId, onSubmit, settings, updateSetting, bookId, createSetting]
  );

  const defaultValues = initialValues
    ? {
        settingName: initialValues.name,
        settingDescription: initialValues.description,
      }
    : undefined;

  return (
    <Form initialValues={defaultValues as FieldValues} onSubmit={handleSubmit}>
      <Text label="Setting Title" name="settingName" required />
      <TextArea
        className="mt-4"
        label="Description"
        name="settingDescription"
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
