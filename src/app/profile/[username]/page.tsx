import Profile from "@/app/component/profile/Profile";

const page = async ({ params }: any) => {
  return (
    <div className="mt-20">
      <Profile />
    </div>
  );
};

export default page;
