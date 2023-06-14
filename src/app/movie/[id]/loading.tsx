export default function Loading() {
  return (
    <div>
      <div className="h-[38rem] w-full">
        <div className="relative animate-pulse">
          <div className="bg-_black_bg rounded-t-[45px] h-[32rem] select-none object-top" />
          <div className="absolute bottom-0 bg-gradient-to-t from-gray-900 inset-x-0 h-40" />
        </div>
        <section className="bg-_black_bg -translate-y-12 rounded-t-[45px]">
          <div>
            <div className="w-52 h-72 absolute -translate-y-36 translate-x-16 animate-pulse">
              <div className="bg-_black_bg w-full h-full rounded-2xl select-none" />
            </div>
            <section className="pl-72 h-60 py-6 flex justify-between">
              <div>
                <div className="text-4xl w-44 h-9 bg-neutral-700 font-bold tracking-wide animate-pulse" />
                <div className="mt-4">
                  <div className="bg-_black_bg w-20 h-6 animate-pulse" />
                </div>
                <div className="mt-3 pl-1 flex items-center gap-2">
                  <span className="bg-neutral-700 w-12 h-3 rounded-md font-Inter text-[13px] animate-pulse" />
                  <div className="bg-_black_bg w-1 h-1 rounded-full mx-1 animate-pulse" />
                  <span className="bg-neutral-700 w-12 h-3 rounded-md font-Inter text-[13px] animate-pulse" />
                  <div className="bg-_black_bg w-1 h-1 rounded-full mx-1 animate-pulse" />
                  <div className="flex items-center gap-2">
                    <span className="bg-neutral-700 w-12 h-3 rounded-md text-xs animate-pulse" />
                    <div className="bg-_black_bg text-yellow-400 text-sm mb-[1px] animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="mr-24 pt-3">
                <button className="text-neutral-700 w-28  h-9 px-6 text-base tracking-wider py-2 rounded-lg bg-gray-800 animate-pulse" />
              </div>
            </section>
            <section>
              <p className="text-gray-300 font-light tracking-wide px-16 text-base font-Helvetica animate-pulse" />
            </section>
          </div>
          <section className="px-6 mt-10">
            <div className="bg-_black_bg w-full h-6 animate-pulse" />
          </section>
          <section className="px-6 mt-12">
            <div className="bg-_black_bg w-full h-96 animate-pulse" />
          </section>
        </section>
      </div>
    </div>
  );
}
