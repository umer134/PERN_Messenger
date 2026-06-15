import { Search } from "lucide-react";

import * as s from './search-bar.css';

type Props = {
  value: string;

  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Search size={16} />

        <input
          value={value}
          className={s.input}
          placeholder="Search conversations..."
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};