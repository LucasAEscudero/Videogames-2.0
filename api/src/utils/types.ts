export interface videogamesResponseType {
  next: boolean;
  previous: boolean;
  results: [];
}

export interface videogameType {
  id: number | string;
  name: string;
  description?: string;
  image: string;
  released: string;
  rating: number;
  metacritic: number | null;
  platforms: string[];
  genres: string[];
  tags: string[];
  stores: string[];
  developers?: string[];
}

export type videogameResultReponseType = Pick<
  videogameType,
  "id" | "name" | "released" | "rating" | "metacritic"
> & {
  description_raw: string;
  background_image: string;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  tags: { name: string; language: string }[];
  stores: { store: { name: string } }[];
  developers?: { name: string }[];
};
