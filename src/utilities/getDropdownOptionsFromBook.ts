import type { DropdownOption } from '../components/formControls/Dropdown';
import type { Book } from '../types/services';
import { getLabelsFromBook } from './getLabelsFromBook';

export const getDropdownOptionsFromBook = (book: Book): DropdownOption[] => {
  const labels = getLabelsFromBook(book);

  const options = labels.map(
    ({ label, id }): DropdownOption => ({
      label,
      value: id,
    })
  );

  return options;
};
