import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { SettingForm } from '../../../../src/components/forms/SettingForm';
import { useBooks } from '../../../../src/components/hooks/useBooks';
import { useNotes } from '../../../../src/components/hooks/useNotes';
import { useSettings } from '../../../../src/components/hooks/useSettings';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { Notes } from '../../../../src/components/Notes';
import { getNotesByLabelIds } from '../../../../src/services/getNotesByLabelIds';
import { getSettingById } from '../../../../src/services/getSettingById';
import type { Note } from '../../../../src/types/services';
import { getBookWithId } from '../../../../src/utilities/getBookWithId';
import { SidebarLabels } from '../../../../src/utilities/sidebar-labels';

type SettingProps = {
  initialNotes?: Note[];
  currentSettingId: string;
  currentBookId: string;
};

export default function SettingPage({
  initialNotes,
  currentSettingId,
  currentBookId,
}: SettingProps): ReactElement {
  const { getSettings } = useSettings();
  const { books } = useBooks();
  const { createNote, deleteNote, notes } = useNotes(initialNotes ?? []);
  const book = getBookWithId(currentBookId, books);
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
        <>
          <SettingForm
            bookId={currentBookId}
            initialValues={setting}
            settingId={currentSettingId}
          />
          <Notes
            book={book}
            bookId={currentBookId}
            createNote={createNote}
            deleteNote={deleteNote}
            initialLabels={[String(setting.label.id)]}
            notes={notes}
          />
        </>
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
    const initialNotes = labelId ? await getNotesByLabelIds([labelId]) : [];

    return {
      props: {
        initialNotes,
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
