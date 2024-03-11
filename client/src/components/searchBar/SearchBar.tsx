"use client";
import { Input, Button } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

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
        className="w-[15rem] sm:w-[20rem] h-[2rem]"
      />
    </div>
  );
}
