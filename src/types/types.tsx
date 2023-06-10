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
