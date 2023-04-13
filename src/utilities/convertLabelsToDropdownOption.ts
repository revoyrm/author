import type { DropdownOption } from '../components/formControls/Dropdown';
import type { Label } from '../types/services';

// eslint-disable-next-line import/prefer-default-export
export const convertLabelsToDropdownOption = (
  labels: Label[]
): DropdownOption[] => labels.map(({ id, label }) => ({ value: id, label }));
