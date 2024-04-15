import React, { Suspense } from "react";
import SingleMessage from "../component/chat/Message/SingleMessage";

const page = () => {
  return (
    <div className="pl-40 max-md:pl-0">
      <Suspense>
        <SingleMessage />
      </Suspense>
    </div>
  );
};

export default page;
