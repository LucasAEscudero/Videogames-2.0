// fetch api types
export interface fetchApiDataType {
  next: boolean | null;
  previous: boolean | null;
  results: string[];
}

export type fetchApiVideogamesType = Omit<fetchApiDataType, "results"> & {
  results: videogameApiType[];
};

// types
export interface videogameApiType {
  id: number | string;
  name: string;
  description_raw: string;
  background_image: string;
  released: string;
  rating: number;
  metacritic: number | null;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  tags: { name: string; language: string }[];
  stores: { store: { name: string } }[];
  developers?: { name: string }[];
}

export type videogameType = Pick<
  videogameApiType,
  "id" | "name" | "released" | "rating" | "metacritic"
> & {
  description?: string;
  image: string;
  platforms: string[];
  genres: string[];
  tags: string[];
  stores: string[];
  developers?: string[];
};

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  library: string[];
}

export type arraysTypes = string[] | videogameType[] | UserType[];
