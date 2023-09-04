import React from "react";
import { getUserDataTypes } from "@/types/userTypes";
import { Role } from "@/types/role";
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import moment from "moment";

interface ProfileAboutProps extends getUserDataTypes {
  role: Role;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({
  _id,
  followers,
  following,
  ownProfile,
  role,
  facebook,
  github,
  instagram,
  twitter,
  genre,
  bio,
  createdAt,
}) => {
  function formatProfileLink(link: string) {
    let cleanedLink = link.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
    const parts = cleanedLink.split("/");
    const filteredParts = parts.filter((part) => part !== "");
    const formattedLink = filteredParts.join("/");
    return formattedLink;
  }

  const facebookLink = formatProfileLink(facebook ?? "");
  const InstaLink = formatProfileLink(instagram ?? "");
  const GithubLink = formatProfileLink(github ?? "");
  const TwitterbLink = formatProfileLink(twitter ?? "");

  return (
    <div>
      <div className="mt-16 ">
        <div className="border-b py-8 pl-8 border-b-neutral-500 border-opacity-30">
          <>
            {" "}
            <h2 className="font-medium text-neutral-200 tracking-wide">
              {" "}
              Joined
            </h2>
            <p className="mt-3 font-light text-sm text-neutral-300">
              {" "}
              {moment(createdAt).format("Y MMMM")}
            </p>
          </>
        </div>
        {bio && (
          <div className="border-b py-8 pl-8 border-b-neutral-500 border-opacity-30">
            <>
              {" "}
              <h2 className="font-medium text-neutral-200 tracking-wide">
                {" "}
                BIO
              </h2>
              <p className="mt-3 font-light text-sm text-neutral-300">{bio}</p>
            </>
          </div>
        )}
        {genre && genre.length > 0 && (
          <div className="mt-3 border-b py-8 pl-8 border-b-neutral-500 border-opacity-30">
            <h2 className="font-medium text-neutral-200 tracking-wide">
              {" "}
              Favorite Genres
            </h2>
            <div className="flex gap-4 mt-5 -translate-x-1">
              {genre.map((item, key) => {
                return (
                  <span
                    key={key}
                    className="border max-md:text-xs border-neutral-400 px-3 rounded-2xl py-1 border-opacity-30 text-sm text-neutral-300 font-normal"
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {genre && genre.length > 0 && (
          <div className="mt-3 border-b py-8 pl-8 border-b-neutral-500 border-opacity-30">
            <h2 className="font-medium text-neutral-200 tracking-wide">
              {" "}
              SOCIAL
            </h2>
            <div className="flex gap-4 mt-5 flex-wrap -translate-x-1">
              {facebook && (
                <div className="flex gap-4 items-center">
                  <div className="h-fit w-fit p-2 bg-blue-400 flex items-center rounded-full">
                    <FaFacebookF className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-light text-sm text-neutral-300">
                      Facebook
                    </h4>
                    <a
                      href={facebook}
                      className="font-light text-sm text-neutral-200"
                    >
                      {facebookLink}
                    </a>
                  </div>
                </div>
              )}
              {instagram && (
                <div className="flex gap-4 items-center">
                  <div className="h-fit w-fit p-2 bg-[#945e3d] flex items-center rounded-full">
                    <FaInstagram className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-light text-sm text-neutral-300">
                      Instagram
                    </h4>
                    <a
                      href={instagram}
                      className="font-light text-sm text-neutral-200"
                    >
                      {InstaLink}
                    </a>
                  </div>
                </div>
              )}
              {instagram && (
                <div className="flex gap-4 items-center">
                  <div className="h-fit w-fit p-2 bg-[#2e6ee5] flex items-center rounded-full">
                    <FaTwitter className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-light text-sm text-neutral-300">
                      Twitter
                    </h4>
                    <a
                      href={twitter}
                      className="font-light text-sm text-neutral-200"
                    >
                      {TwitterbLink}
                    </a>
                  </div>
                </div>
              )}
              {github && (
                <div className="flex gap-4 items-center">
                  <div className="h-fit w-fit p-2 bg-[#5f6570] flex items-center rounded-full">
                    <FaGithub className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-light text-sm text-neutral-300">
                      GitHub
                    </h4>
                    <a
                      href={github}
                      className="font-light text-sm text-neutral-200"
                    >
                      {GithubLink}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAbout;
