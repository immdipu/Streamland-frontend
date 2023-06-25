export interface showType {
  TYPE: "MOVIE" | "TV";
}

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
  adult?: boolean;
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
  name?: string;
  media_type?: string;
  first_air_date?: string;
}

export interface castProps {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: string;
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

export interface tvshowCreatorProps {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface TVshowNetworkProps {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TVshowSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface seasonsProps {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SingleShowProps extends showType {
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
  title?: string;
  vote_average: number;
  vote_count: number;
  episode_run_time?: [];
  first_air_date?: string;
  name?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_name?: string;
  in_production?: boolean;
  created_by?: tvshowCreatorProps[];
  networks?: TVshowNetworkProps[];
  spoken_languages?: TVshowSpokenLanguage[];
  tagline?: string;
  last_air_date?: string;
  seasons: seasonsProps[];
  similar: {
    page: number;
    results: NowPlayingResponse[];
    total_pages: number;
    total_results: number;
  };
  recommendations: {
    page: number;
    results: NowPlayingResponse[];
    total_pages: number;
    total_results: number;
  };
}

export interface singleTVShowProps {
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids?: [];
  id: string;
  name?: string;
  original_name?: string;
  overview?: string;
  vote_average?: number;
  poster_path?: string;
}
