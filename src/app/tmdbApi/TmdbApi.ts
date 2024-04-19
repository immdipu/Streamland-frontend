import axios from "axios";

export const Apis = {
  TrendingPerson: async () => {
    const res = await fetch(
      `${process.env.BASE_URL}/3/trending/person/week?api_key=${process.env.API_KEY}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },

  TrendingMovies: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/trending/movie/week?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  TopRatedMovies: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/movie/top_rated?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  PopularMovies: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/movie/popular?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page} &language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  NowPlayingMovies: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/movie/now_playing?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },

  UpcomingMovies: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/movie/upcoming?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  //////////////////////////  TV show Api //////////////////////////
  TrendingTv: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/trending/tv/week?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  AiringTodayTv: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/tv/airing_today?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  OnTheAirTv: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/tv/on_the_air?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  PopularTv: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/tv/popular?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },

  MultiSearch: async (query: string, page: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
  SingleSearch: async (query: string, page: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${query}&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },

  TopRatedTv: async (page: number) => {
    const res = await fetch(
      `${
        process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL
      }/3/tv/top_rated?api_key=${
        process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY
      }&page=${page}&language=${process.env.NEXT_PUBLIC_LAN}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },

  GetAllEpisodes: async (
    tv_id: string,
    currSea: string | null,
    totalEpisodes: string | null
  ) => {
    const Episodes = [];
    if (!currSea || !totalEpisodes) return;

    let total = parseFloat(totalEpisodes);

    for (let i = 1; i <= total; i++) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/3/tv/${tv_id}/season/${currSea}/episode/${i}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${process.env.NEXT_PUBLIC_LAN}`
        );
        Episodes.push(res.data);
      } catch (error) {
        Episodes.push(null);
      }
    }
    return Episodes as singleEpisodeTypes[];
  },

  GetYouTubeTrailer: async () => {
    try {
      const res = await axios.get(
        `https://www.youtube.com/results?search_query=foe+trailer`
      );
      return res.data;
    } catch (error) {
      return null;
    }
  },
};
