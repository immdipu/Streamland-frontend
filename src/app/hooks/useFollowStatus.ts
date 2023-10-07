"use client";
import React, { useEffect, useState } from "react";

const useFollowStatus = ({
  isFollowing,
  isAFollower,
}: {
  isFollowing: boolean;
  isAFollower: boolean;
}) => {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (isFollowing && isAFollower) {
      setStatus("Friends");
    } else if (isFollowing && !isAFollower) {
      setStatus("Following");
    } else if (!isFollowing && isAFollower) {
      setStatus("Follow Back");
    } else {
      setStatus("Follow");
    }
  }, [isFollowing, isAFollower]);

  return status;
};

export default useFollowStatus;
