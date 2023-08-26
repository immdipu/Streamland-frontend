export interface serachItemProps {
  adult: boolean;
  id: string;
  media_type: "movie" | "tv" | "person";
  original_language: string;
  original_title?: string;
  original_name?: string;
  name?: string;
  profile_path?: string | null;
  popularity: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  vote_average?: number;
  first_air_date?: string;
}

export interface SearchResultsProps {
  page: number;
  results: serachItemProps[];
  total_pages: number;
  total_results: number;
}
