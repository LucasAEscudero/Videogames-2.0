import { Request } from "express";

// api types
// results: genres[] | platforms[]
export interface fetchApiDataType {
  next: string | null;
  previous: string | null;
  results: genresApiType[] | platformsApiType[];
}

// results: videogames[]
export type fetchApiVideogamesType = Omit<fetchApiDataType, "results"> & {
  results: videogameApiType[];
};

export interface genresApiType {
  id: string;
  name: string;
}

export type platformsApiType = genresApiType;

export interface videogameApiType {
  id: number | string;
  name: string;
  slug: string;
  description_raw: string;
  background_image: string;
  released: string;
  rating: number;
  metacritic: number | null;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  tags?: { name: string; language: string }[];
  stores?: { store: { name: string } }[];
  developers?: { name: string }[];
}

// local types
export interface videogamesResponseType {
  next: boolean;
  previous: boolean;
  results: videogameType[];
}

export type videogameType = Pick<
  videogameApiType,
  "id" | "name" | "released" | "rating" | "metacritic"
> & {
  description?: string;
  image: string;
  platforms: string[];
  genres: string[];
  tags?: string[];
  stores?: string[];
  screenshots?: string[];
  developers?: string[];
};

export interface videogamesQuerysType {
  search?: string;
  platforms?: string;
  genres?: string;
  ordering?:
    | "name"
    | "-name"
    | "released"
    | "-released"
    | "added"
    | "-added"
    | "created"
    | "-created"
    | "updated"
    | "-updated"
    | "rating"
    | "-rating"
    | "metacritic"
    | "-metacritic";
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  library: string[];
}

export type RequestSessionType = Request & {
  user?: any;
};
