import OnlineUserSlider from "./OnlineUserSlider";

const OnlineUsers = () => {
  return (
    <div className="px-6 my-10 max-md:px-1">
      <h2 className="font-medium pl-9 max-md:pl-6 my-6 text-xl text-_white ">
        Online Users
      </h2>
      <section>
        <OnlineUserSlider />
      </section>
    </div>
  );
};

export default OnlineUsers;
