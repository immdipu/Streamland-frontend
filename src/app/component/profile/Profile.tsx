"use client";
import { userApis } from "@/app/userApi";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/role";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProfileCardSkeleton from "../skeleton/ProfileCardSkeleton";
import ProfileCard from "./ProfileCard";
import TabButtons from "./TabButtons";
const ProfileAbout = dynamic(() => import("./ProfileAbout"));
const ProfileEdit = dynamic(() => import("./ProfileEdit"));
const ProfileFriends = dynamic(() => import("./ProfileFriends"));
const ProfileSettings = dynamic(() => import("./ProfileSettings"));

const Profile = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const TabName = searchParams.get("tab");
  const user = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(TabName ?? "about");

  const { data, isLoading, error } = useQuery(
    ["getUser", params.username],
    () => userApis.GetUserProfile(params.username as string)
  );

  useEffect(() => {
    setActiveTab(TabName ?? "about");
  }, [TabName]);

  if (!user.isUserAuthenticated) {
    return (
      <div className="mt-64 text-center w-full text-3xl text-neutral-400 max-md:text-xl font-semibold ">
        You need to login to view this page
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-20">
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 min-h-screen grid place-content-center">
        <h5 className="text-2xl text-neutral-400">User not found</h5>
      </div>
    );
  }

  return (
    <Suspense>
      <div>
        <Row>
          <Col lg={12} md={12}>
            {data ? <ProfileCard {...data} role={user.role} /> : null}
            <section className="py-7 max-md:mx-4 mx-11 bg-neutral-800 mb-16 rounded-b-md">
              <TabButtons
                currentuserRole={user.role}
                username={params.username as string}
                ownprofile={data?.ownProfile!}
              />
              {data ? (
                <section>
                  {activeTab === "about" ? (
                    <ProfileAbout {...data} role={user.role} />
                  ) : (activeTab === "editprofile" && data.ownProfile) ||
                    user.role === Role.admin ? (
                    <ProfileEdit {...data} role={user.role} />
                  ) : activeTab === "friends" ? (
                    <ProfileFriends />
                  ) : activeTab === "accountsettings" ? (
                    <ProfileSettings />
                  ) : (
                    ""
                  )}
                </section>
              ) : null}
            </section>
          </Col>
        </Row>

        <section></section>
      </div>
    </Suspense>
  );
};

export default Profile;
