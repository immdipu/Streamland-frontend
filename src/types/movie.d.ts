interface SingleShowProps extends showType {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  credits: creditsProps;
  homepage: string;
  id: string;
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
