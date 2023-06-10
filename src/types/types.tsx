export interface DesktopSingleComponentProps {
  href: string;
  icon: any;
  active: boolean;
  label: string;
}

export interface getTrendingListResponse {
  adult: boolean;
  backdrop_path?: string;
  id: string;
  title?: string;
  name?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: "movie" | "tv";
  genre_id?: [];
  popularity?: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  origin_country?: [];
}

export interface NowPlayingResponse {
  adult: boolean;
  backdrop_path?: string;
  id: string;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  genre_ids?: [];
  popularity?: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface castProps {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  know_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export interface creditsProps {
  cast: castProps[];
  crew: any;
}

export interface genresProps {
  id: number;
  name: string;
}

export interface SingleShowProps {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  credits: creditsProps;
  homepage: string;
  id: number;
  genres: genresProps[];
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
