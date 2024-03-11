"use client";
import { Input } from "@nextui-org/react";

interface SearchBarProps {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function SearchBar({
  search,
  handleSearch,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="flex justify-center gap-3 mb-2">
      <Input
        type="text"
        label={placeholder}
        value={search}
        onChange={handleSearch}
        className="w-[20rem] h-[50px]"
      />
    </div>
  );
}
