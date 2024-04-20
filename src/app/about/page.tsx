import Link from "next/link";
import { About } from "../component";

const page = () => {
  return (
    <div>
      <About />
      <div className=" absolute bottom-0  max-md:gap-4 gap-10 left-0 right-0 justify-end  ml-56 max-md:ml-0 items-center h-24 max-md:h-fit flex bg-neutral-800">
        <div className="flex gap-2 items-center  justify-end w-full  pr-20 max-md:pr-6  pl-5 ">
          <Link className="text-neutral-100" href={"/"}>
            ©ShowMania
          </Link>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <Link
            href={"/terms"}
            className="font-light text-neutral-200 text-sm hover:underline"
          >
            Terms and condition
          </Link>
        </div>

        <div className="w-fit max-sm:w-full mr-16 max-sm:mr-0">
          <div className="border  border-neutral-400 border-opacity-30 relative py-2 px-3 max-w-xl w-full">
            <div className="bg-blue-500 w-2 h-2 rounded-full absolute -right-1 -top-1" />
            <p className="text-xs max-md:text-xxs text-neutral-200 font-extralight tracking-wide leading-4">
              ShowMania does not store any files on our server, we only linked
              to the media which is hosted on 3rd party services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
