import { SidebarLabels } from './sidebar-labels';

export default function getSidebarItems(currentBookId: string): {
  label: string;
  route?: string;
}[] {
  return [
    {
      label: SidebarLabels.Home,
      route: `/`,
    },
    {
      label: SidebarLabels.Characters,
      route: `/book/${currentBookId}/characters`,
    },
    { label: SidebarLabels.Settings, route: `/book/${currentBookId}/settings` },
    { label: SidebarLabels.Chapters, route: `/book/${currentBookId}/chapters` },
    { label: SidebarLabels.AllNotes, route: `/book/${currentBookId}/notes` },
  ];
}
