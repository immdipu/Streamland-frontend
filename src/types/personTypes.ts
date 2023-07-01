import { serachItemProps } from "./searchTypes";

export interface SingleActorProps {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
  combined_credits: {
    cast: serachItemProps[];
    crew: any;
  };
}

export interface SingleTrendingPersonProp {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: any;
}

export interface TrendingPersonProps {
  page: number;
  results: SingleTrendingPersonProp[];
  total_pages: number;
  total_results: number;
}
