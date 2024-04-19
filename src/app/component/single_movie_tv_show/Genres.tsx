import Link from "next/link";

const Genres = ({
  data,
  TYPE,
}: {
  data: genresProps[];
  TYPE: "MOVIE" | "TV";
}) => {
  return (
    <div className="flex gap-3 flex-wrap max-md:justify-center">
      {data.map((item) => {
        if (TYPE === "MOVIE") {
          return (
            <Link
              key={item.id}
              className="text-_welcometext_lightblue whitespace-nowrap bg-_genre_chip_bg shadow-sm  px-2 py-1 rounded-md font-normal tracking-wide hover:text-_white duration-300 transition-colors ease-linear text-xs"
              href={`/movie/genre?tab=${item.id}`}
            >
              {item.name}
            </Link>
          );
        }
        if (TYPE === "TV") {
          return (
            <Link
              key={item.id}
              className="text-_welcometext_lightblue whitespace-nowrap bg-_genre_chip_bg shadow-sm  px-2 py-1 rounded-md font-normal tracking-wide hover:text-_white duration-300 transition-colors ease-linear text-xs"
              href={`/tv/genre?tab=${item.id}`}
            >
              {item.name}
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Genres;
