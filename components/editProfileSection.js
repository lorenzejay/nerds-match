import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db, storage } from "../utils/firebase";
// const updateImage = async (file) => {
//     const snapShot = storage.ref().child('images').put(file)
//     setImage
// }

const EditProfileSection = () => {
  const router = useRouter();
  const auth = useAuth();
  const { user, updateAbout, updateProfilePic } = auth;

  //pulled from the db
  const [aboutMe, setAboutMe] = useState("this is it");
  const [aboutCharCount, setAboutCharCount] = useState(0);
  const [toSendPP, setToSendPP] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [errors, setErrors] = useState();

  //make sure there is a logged in user
  useEffect(() => {
    if (user === null) {
      router.push("/signIn");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setAboutMe(user.about);
      setProfilePic(user.profilePic);
    }
  }, [user]);

  useEffect(() => {
    if (aboutMe) {
      setAboutCharCount(aboutMe.length);
    }
  }, [aboutMe]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicPreview(reader.result);
    };
  };

  const handleSettingProfileImage = async (e) => {
    try {
      //whatever was inserted
      const file = e.target.files[0];

      //validate input file was a img
      const fileName = e.target.value;
      //file type validations
      const idxDot = fileName.lastIndexOf(".") + 1;
      const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

      if (extFile === "jpg" || extFile === "png" || extFile === "jpeg") {
        setToSendPP(file);
        //start preview
        previewFile(file);
        //get reference to firebase storage
      } else {
        window.alert("Accepted file types are .jpg, .png, and .jpeg only.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfilePicture = () => {
    if (toSendPP) {
      //upload to storage bucket first
      updateProfilePic(updateProfilePic(toSendPP));
    }
  };

  const handleUpdateAboutMe = () => {
    if (150 - aboutCharCount < 0) {
      return window.alert("You have exceeded the character count.");
    }
    updateAbout(aboutMe);
  };

  return (
    <section className="text-gray-400 mb-10">
      <div>
        <p>My Photo</p>
        <img
          src={profilePic || profilePicPreview || "default-profile.png"}
          className="object-cover w-full h-80"
        />
        <input
          type="file"
          name="profilePic"
          accept=".jpg, .jpeg, .png"
          onChange={handleSettingProfileImage}
        />
        <button
          className={`bg-gray-800 w-full disabled:opacity-50 text-white transition duration-500 ease-in-out`}
          disabled={!profilePicPreview}
          onClick={handleUpdateProfilePicture}
        >
          Update Profile Picture
        </button>
      </div>
      <div className="my-4">
        <p>My Answers</p>
        <div className="rounded-lg border border-gray-400 flex flex-col p-3">
          <label className="text-gray-800">About Me</label>
          <textarea
            className="focus:outline-none focus:text-gray-800 h-auto"
            placeholder="Let them know who you are"
            value={aboutMe}
            rows="5"
            onChange={(e) => setAboutMe(e.target.value)}
          />
          <p className={`${150 - aboutCharCount < 0 ? "text-red-600" : "text-green-400"}`}>
            {150 - aboutCharCount}
          </p>
          <button
            className={`bg-gray-800 w-full disabled:opacity-50 text-white transition duration-500 ease-in-out`}
            disabled={150 - aboutCharCount < 0 ? true : false}
            onClick={handleUpdateAboutMe}
          >
            Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProfileSection;
