import React, { FC } from "react";
import EditProfileInfo from "./EditProfileInfo";
import EditProfilePhoto from "./EditProfilePhoto";

const SettingsForm: FC = () => {
  return (
    <form className="grid grid-cols-5 w-1/2 h-3/4 z-10 bg-white rounded-xl p-14">
      {/* Edit Profile Photo */}
      <EditProfilePhoto />

      {/* Edit Profile Info */}
      <EditProfileInfo />
    </form>
  );
};

export default SettingsForm;
