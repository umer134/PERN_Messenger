import { Search } from "lucide-react";

import * as s from './search-bar.css';

export const SearchBar = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Search size={16} />

        <input
          className={s.input}
          placeholder="Search conversations..."
        />
      </div>
    </div>
  );
};