import React from "react";
import { useAppSelector } from "../hooks/useRedux";

const Profile = () => {
  const { avatar } = useAppSelector((state) => state.user);
  return (
    <img
      src={avatar}
      alt="avatar"
      className="rounded-full w-12 aspect-square border-2 border-transparent hover:border-primary-orange cursor-pointer"
    />
  );
};

export default Profile;
