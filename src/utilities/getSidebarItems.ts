import { SidebarLabels } from './sidebar-labels';

// eslint-disable-next-line import/no-default-export
export default function getSidebarItems(currentBookId: string): {
  label: string;
  route?: string;
}[] {
  return [
    {
      label: SidebarLabels.Book,
      route: `/book/${currentBookId}`,
    },
    {
      label: SidebarLabels.Characters,
      route: `/book/${currentBookId}/characters`,
    },
    { label: SidebarLabels.Settings, route: `/book/${currentBookId}/settings` },
    { label: SidebarLabels.Chapters, route: `/book/${currentBookId}/chapters` },
    { label: SidebarLabels.Notes, route: `/book/${currentBookId}/notes` },
  ];
}
