import React from "react";
import Images from "@/app/component/ImageComponent/Image";
import { SingleActorProps } from "@/types/personTypes";
import { serachItemProps } from "./../../../types/searchTypes";
import PersonMovieShows from "@/app/component/person/PersonMovieShows";

async function getSinglePerson(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/3/person/${id}?api_key=${process.env.API_KEY}&append_to_response=combined_credits`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async ({ params }: any) => {
  const res: SingleActorProps = await getSinglePerson(params.id);

  return (
    <div className="pt-24 px-6">
      <section className="flex gap-5 max-md:flex-col">
        {res.profile_path && (
          <div className="w-72 flex-shrink-0">
            <Images
              src={`https://image.tmdb.org/t/p/w500${res.profile_path}`}
              alt={res.name}
              height={500}
              width={500}
              ImageWidth={"full"}
              Imageheight={384}
            />
          </div>
        )}
        <p className="max-lg:text-sm">{res.biography}</p>
      </section>
      <section className="mt-9">
        <h2 className="text-2xl opacity-90 font-semibold">
          Personal information
        </h2>
        {res.birthday && (
          <div className="mt-4">
            <h4 className="text-lg text-_white">Birthday</h4>
            <p className="text-sm mt-1 text-_welcometext_lightblue">
              {res.birthday}
            </p>
          </div>
        )}
        {res.place_of_birth && (
          <div className="mt-4">
            <h4 className="text-lg text-_white">Birth Place</h4>
            <p className="text-sm mt-1 text-_welcometext_lightblue">
              {res.place_of_birth}
            </p>
          </div>
        )}
      </section>
      <PersonMovieShows data={res.combined_credits.cast} />
    </div>
  );
};

export default page;
