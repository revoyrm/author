export default function getSidebarItems(currentBookId: string): {
  label: string;
  route?: string;
}[] {
  return [
    {
      label: 'Home',
      route: `/`,
    },
    {
      label: 'Characters',
      route: `/book/${currentBookId}/characters`,
    },
    { label: 'Settings', route: `/book/${currentBookId}/settings` },
    { label: 'Chapters', route: `/book/${currentBookId}/chapters` },
    { label: 'Notes', route: `/book/${currentBookId}/notes` },
  ];
}
