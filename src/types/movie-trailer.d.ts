declare module "movie-trailer" {
  function movieTrailer(
    name: string,
    options?: { id: boolean; multi: boolean; videoType: string },
    callback?: (error: any, trailers: string[]) => void
  ): Promise<string[]>;

  export = movieTrailer;
}
