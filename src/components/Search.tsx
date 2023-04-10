import type { KeyboardEvent, ReactElement } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import type { MultiValue } from 'react-select';
import Select from 'react-select';

import type { Book } from '../types/services';
import { getLabelsFromBook } from '../utilities/getLabelsFromBook';
import type { DropdownOption } from './formControls/Dropdown';

type SearchProps = {
  searchType: string;
  onSearch: (
    values: MultiValue<{ value: number; label: string }>
  ) => Promise<void>;
  onClearSearch: () => void;
  book?: Book;
  // options: DropdownOption[];
};
export function Search({
  searchType = 'book',
  onSearch,
  onClearSearch,
  book,
}: // options,
SearchProps): ReactElement {
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<{ value: number; label: string }>
  >([]);
  const bgColor = '#e5edef';
  const textColor = '#00283c';
  const hoverColor = '#407c95';

  const options = useMemo(
    () =>
      book
        ? getLabelsFromBook(book).map(({ id, label }) => ({ value: id, label }))
        : [],
    [book]
  );

  const handleSelect = useCallback(
    (newValue: MultiValue<{ value: number; label: string }>): void => {
      if (newValue.length === 0) {
        onClearSearch();
      } else {
        setSelectedOptions(newValue);
      }
    },
    []
  );

  const handleSearch = useCallback(async () => {
    await onSearch(selectedOptions);
  }, [onSearch, selectedOptions]);

  return (
    <div className="flex w-1/2 items-center justify-between rounded-lg bg-[white] p-2 text-primary">
      <Select
        className="basic-single flex-grow"
        classNamePrefix="select"
        instanceId={searchType}
        name={searchType}
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: 0,
            boxShadow: 'none',
            width: '100%',
          }),
          option: (styles, { isSelected, isFocused }) => ({
            paddingLeft: '8px',
            backgroundColor: isSelected || isFocused ? bgColor : undefined,
            color: textColor,
            ':active': {
              ...styles[':active'],
              backgroundColor: isSelected ? bgColor : undefined,
              color: textColor,
            },
          }),
          multiValue: (styles) => ({
            ...styles,
            backgroundColor: bgColor,
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: textColor,
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: textColor,
            ':hover': {
              color: hoverColor,
            },
          }),
        }}
        isMulti
        onChange={handleSelect}
        onKeyDown={async (e: KeyboardEvent<HTMLDivElement>): Promise<void> => {
          if (e.key === 'Enter') {
            await handleSearch();
          }
        }}
      />
      <FaSearch
        className="m-1 w-fit hover:cursor-pointer hover:text-primary-light"
        onClick={handleSearch}
      />
    </div>
  );
}
