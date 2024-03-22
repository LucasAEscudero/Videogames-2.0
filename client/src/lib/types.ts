export interface videogameType {
  id: number;
  name: string;
  image: string;
  rating: number;
  released: string;
  metacritic: number;
  platforms: string[];
  genres: string[];
  tags: string[];
  stores: string[];
}

export type videogameDetailsType = Pick<
  videogameType,
  | "id"
  | "name"
  | "image"
  | "rating"
  | "released"
  | "metacritic"
  | "platforms"
  | "genres"
  | "tags"
  | "stores"
> & {
  description: string;
  developers: string[];
  screenshots: string[];
};

export interface videogamesResponseType {
  next: boolean;
  previous: boolean;
  results: videogameType[];
}

export type genreApiType = {
  id: number;
  name: string;
};

export type platformApiType = genreApiType;

export type genreType = {
  label: string;
  value: string;
};

export type platformType = genreType;

export interface videogamesQueryType {
  search: string;
  genres: string;
  platforms: string;
  ordering: string;
}

export interface userType {
  id: string;
  username: string;
  email: string;
}
