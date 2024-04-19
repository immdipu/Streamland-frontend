import Slider from "../silder/Slider";
const SimilarMovie = ({
  results,
  type,
}: {
  results: NowPlayingResponse[];
  type: "MOVIE" | "TV";
}) => {
  return (
    <div>
      <h3 className="text-_white  text-2xl mb-4 font-medium pl-10">
        Similar {type === "MOVIE" ? "Movies" : "TV Shows"}
      </h3>
      <Slider className="similar_movies" type={type} data={results} />
    </div>
  );
};

export default SimilarMovie;
