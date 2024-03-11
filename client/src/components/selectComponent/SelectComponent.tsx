import { Select, SelectItem } from "@nextui-org/react";

import { genreType, platformType } from "@/lib/types";

interface SelectProps {
  label: string;
  placeholder: string;
  options: genreType[] | platformType[];
  name: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export default function SelectComponent({
  label,
  placeholder,
  options,
  name,
  handleChange,
}: SelectProps) {
  return (
    <Select
      label={label}
      // placeholder={placeholder}
      className="w-[15rem]"
      size="sm"
      onChange={handleChange}
      name={name}
      labelPlacement="inside"
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
