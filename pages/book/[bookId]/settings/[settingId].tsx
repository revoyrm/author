import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { SettingForm } from '../../../../src/components/forms/SettingForm';
import { useSettings } from '../../../../src/components/hooks/useSettings';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { getBookById } from '../../../../src/services/getBookById';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import { getSettingById } from '../../../../src/services/getSettingById';
import type { Note, Setting } from '../../../../src/types/services';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type SettingProps = {
  notes?: Note[];
  currentSettingId: string;
  currentBookId: string;
};

export default function SettingPage({
  notes,
  currentSettingId,
  currentBookId,
}: SettingProps): ReactElement {
  const { getSettings } = useSettings();
  const settings = getSettings(currentBookId);
  const setting = settings.find((s) => String(s.id) === currentSettingId);

  return (
    <BookLayout
      activeNav={SidebarLabels.Book}
      bookId={currentBookId}
      heading="Book Name"
      searchType="book"
    >
      {setting?.id ? (
        <SettingForm
          bookId={currentBookId}
          initialValues={setting}
          settingId={currentSettingId}
        />
      ) : (
        <div>No Setting Found</div>
      )}
    </BookLayout>
  );
}

export async function getServerSideProps(context: NextPageContext): Promise<{
  props: SettingProps;
}> {
  const bookId = context.query.bookId as string;
  const settingId = context.query.settingId as string;
  try {
    const setting = await getSettingById(Number(settingId));

    const labelId = setting.label.id;
    const notes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        notes,
        currentSettingId: settingId,
        currentBookId: bookId,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        currentSettingId: settingId,
        currentBookId: bookId,
      },
    };
  }
}
