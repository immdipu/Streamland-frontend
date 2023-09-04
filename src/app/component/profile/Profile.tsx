"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useParams } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import Images from "../ImageComponent/Image";
import Link from "next/link";
import ProfileCard from "./ProfileCard";
import clsx from "clsx";
import { getUserDataTypes } from "@/types/userTypes";
import { Role } from "@/types/role";
import { userApis } from "@/app/userApi";
import TabButtons from "./TabButtons";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "../skeleton/ProfileCardSkeleton";
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

  const { data, isLoading } = useQuery(["getUser"], () =>
    userApis.GetUserProfile(params.username)
  );

  useEffect(() => {
    setActiveTab(TabName ?? "about");
  }, [TabName]);

  if (isLoading) {
    return (
      <div className="mt-20">
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (data) {
    console.log(user);
  }

  return (
    <>
      <div>
        <Row>
          <Col lg={12} md={12}>
            {data ? <ProfileCard {...data} role={user.role} /> : null}
            <section className="py-7 max-md:mx-4 mx-11 bg-neutral-800 mb-16 rounded-b-md">
              <TabButtons
                username={params.username}
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
    </>
  );
};

export default Profile;
