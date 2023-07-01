export const Apis = {
  TrendingPerson: async () => {
    const res = await fetch(
      `${process.env.BASE_URL}/3/trending/person/week?api_key=${process.env.API_KEY}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
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
      }&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  },
};
