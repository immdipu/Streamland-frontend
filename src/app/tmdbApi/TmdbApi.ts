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
};
