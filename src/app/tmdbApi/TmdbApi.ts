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

  TrendingTv: async () => {
    const res = await fetch(
      `${process.env.BASE_URL}/3/trending/tv/week?api_key=${process.env.API_KEY}`
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
};
