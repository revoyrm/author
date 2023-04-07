import type { NextPageContext } from 'next';
import type { ReactElement } from 'react';

import { SettingForm } from '../../../../src/components/forms/SettingForm';
import { useSettings } from '../../../../src/components/hooks/useSettings';
import { BookLayout } from '../../../../src/components/layout/BookLayout';
import { SidebarLabels } from '../../../utilities/sidebar-labels';

type SettingProps = {
  currentSettingId: string;
  currentBookId: string;
};

export default function Setting({
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

export function getServerSideProps(context: NextPageContext): {
  props: SettingProps;
} {
  return {
    props: {
      currentSettingId: context.query.settingId as string,
      currentBookId: context.query.bookId as string,
    }, // will be passed to the page component as props
  };
}
