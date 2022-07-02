import type { ReactElement } from 'react';
import { FaSearch } from 'react-icons/fa';

export function Search(): ReactElement {
  return (
    <div className="flex w-1/5 justify-between rounded-lg bg-[white] p-2 text-primary">
      <input className="w-5/6 focus:outline-none" placeholder="book" />
      <FaSearch className="mt-1 w-1/6" />
    </div>
  );
}
