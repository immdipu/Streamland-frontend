import React from "react";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <h1 className="text-_white font-Helvetica text-2xl font-bold tracking-wider text-center mt-8">
        CINEMAA
      </h1>
      <section>
        <h4>News Feed</h4>
        <div>
          <Link>Browse</Link>
        </div>
      </section>
    </div>
  );
};

export default index;
