import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db, storage } from "../utils/firebase";

const EditProfileSection = () => {
  const router = useRouter();
  const auth = useAuth();
  const { user, updateAbout, updateProfilePic, updateTopThreeLanguages } = auth;

  //pulled from the db
  const [aboutMe, setAboutMe] = useState("this is it");
  const [aboutCharCount, setAboutCharCount] = useState(0);
  const [toSendPP, setToSendPP] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [top3Languages, setTopThreeLanguagas] = useState([]);
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

  const [checked, setChecked] = useState({});
  const checkedCount = Object.keys(checked).filter((key) => checked[key]).length;
  const disabled = checkedCount > 2;

  const handleSelectLanguages = (i, e) => {
    const { value } = e.target;
    // console.log(!checked[i]);

    if (!checked[i] === true) {
      setTopThreeLanguagas([...top3Languages, { language: value }]);
    } else {
      const filteredUnchecked = top3Languages.filter((x) => x.language !== value);

      setTopThreeLanguagas(filteredUnchecked);
    }
    setChecked((prevState) => ({
      ...prevState,
      [i]: !checked[i],
    }));
  };
  console.log(checked);
  console.log(top3Languages);

  const [programmingLanguages] = useState([
    "Java",
    "JavaScript",
    "Python",
    "Swift",
    "React",
    "Angular",
  ]);

  const handleUpdateLanguages = () => {
    if (top3Languages.length > 0) {
      updateTopThreeLanguages(top3Languages);
      return window.alert("Successfully updated your top 3 languages");
    }
    window.alert("You must have at least one language selected.");
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
          className={`bg-gray-800 w-full disabled:opacity-50 text-white transition duration-500 ease-in-out px-3 py-1`}
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
            className={`bg-gray-800 w-full disabled:opacity-50 text-white transition duration-500 ease-in-out px-5 py-1`}
            disabled={150 - aboutCharCount < 0 ? true : false}
            onClick={handleUpdateAboutMe}
          >
            Update
          </button>
        </div>
        <div className="rounded-lg border border-gray-400 flex flex-col p-3 my-4 text-gray-800">
          My Top 3 Programming Languages
          <div>
            {programmingLanguages.map((language, i) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    name={language}
                    value={language}
                    className="mr-4"
                    onChange={(e) => handleSelectLanguages(i, e)}
                    checked={checked[i] || false}
                    disabled={!checked[i] && disabled}
                  />
                  <label
                    htmlFor={language}
                    className={`${!checked[i] ? "text-gray-400" : "text-gray-800"}`}
                  >
                    {language}
                  </label>
                </div>
              );
            })}
            <button
              onClick={handleUpdateLanguages}
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfileSection;
