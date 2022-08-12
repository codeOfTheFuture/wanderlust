import React, { FC } from "react";
import EditProfileInfo from "./EditProfileInfo";
import EditProfilePhoto from "./EditProfilePhoto";

const SettingsForm: FC = () => {
  return (
    <form className="grid grid-cols-1 lg:grid-cols-5 w-full lg:w-1/2 h-auto lg:h-3/4 z-10 bg-white rounded-xl p-8 mx-2 lg:mx-0 lg:p-14">
      {/* Edit Profile Photo */}
      <EditProfilePhoto />

      {/* Edit Profile Info */}
      <EditProfileInfo />
    </form>
  );
};

export default SettingsForm;
