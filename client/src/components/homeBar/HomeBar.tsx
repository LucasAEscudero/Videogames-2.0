import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Input, Select, SelectItem } from "@nextui-org/react";
import SelectComponent from "../selectComponent/SelectComponent";

interface HomeBarProps {
  query: {
    search: string;
    genres: string;
    platforms: string;
    ordering: string;
  };
  handleQuery: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
// const orderOptions = [
//   "name",
//   "released",
//   "added",
//   "created",
//   "updated",
//   "rating",
//   "metacritic",
// ];

const orderOptions = [
  {
    label: "Name (A-Z)",
    value: "name",
  },
  {
    label: "Name (Z-A)",
    value: "-name",
  },
  {
    label: "Released (oldest)",
    value: "released",
  },
  {
    label: "Released (newest)",
    value: "-released",
  },
  {
    label: "Added (oldest)",
    value: "added",
  },
  {
    label: "Added (newest)",
    value: "-added",
  },
  {
    label: "Created (oldest)",
    value: "created",
  },
  {
    label: "Created (newest)",
    value: "-created",
  },
  {
    label: "Updated (oldest)",
    value: "updated",
  },
  {
    label: "Updated (newest)",
    value: "-updated",
  },
  {
    label: "Best rating",
    value: "-rating",
  },
  {
    label: "Worst rating",
    value: "rating",
  },
  {
    label: "Best metacritic",
    value: "-metacritic",
  },
  {
    label: "Worst metacritic",
    value: "metacritic",
  },
];

export default function HomeBar({ query, handleQuery }: HomeBarProps) {
  const { genres, platforms } = useSelector(
    (state: RootState) => state.videogames
  );

  return (
    <section className="flex flex-wrap flex-row justify-center gap-3">
      <Input
        type="text"
        label="Name"
        name="search"
        value={query.search}
        onChange={handleQuery}
        className="w-[15rem] h-[50px]"
      />
      {/* <SelectComponent
        label="Genre"
        placeholder="Select a genre"
        options={genres}
        name="genres"
        handleChange={handleQuery}
      />
      <SelectComponent
        label="Platforms"
        placeholder="Select a platform"
        options={platforms}
        name="platforms"
        handleChange={handleQuery}
      /> */}
      <Select
        label="Genre"
        // placeholder={placeholder}
        className="w-[15rem]"
        size="sm"
        onChange={handleQuery}
        name="genres"
        labelPlacement="inside"
      >
        {genres.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Platforms"
        className="w-[15rem]"
        size="sm"
        onChange={handleQuery}
        name="platforms"
        labelPlacement="inside"
      >
        {platforms.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Order"
        // placeholder={placeholder}
        className="w-[15rem]"
        size="sm"
        onChange={handleQuery}
        name="ordering"
        labelPlacement="inside"
      >
        {orderOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </section>
  );
}
