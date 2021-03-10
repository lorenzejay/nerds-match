import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const EditProfileSection = () => {
  const router = useRouter();
  const auth = useAuth();
  const {
    user,
    updateAbout,
    updateProfilePic,
    updateTopThreeLanguages,
    updateOccupation,
    updateEducation,
    updateHobbies,
    updateLocation,
    updatePortfolioSite,
    updateGithubLink,
    updateTwitterLink,
    updateLinkedInLink,
  } = auth;

  //pulled from the db
  const [aboutMe, setAboutMe] = useState("this is it");
  const [aboutCharCount, setAboutCharCount] = useState(0);
  const [toSendPP, setToSendPP] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [top3Languages, setTopThreeLanguagas] = useState([]);
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [location, setLocation] = useState("");
  const [portfolioSite, setPortfolioSite] = useState("");

  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  // const [errors, setErrors] = useState();

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
      setTopThreeLanguagas(user.programmingLanguages);
      setOccupation(user.occupation);
      setEducation(user.education);
      setHobbies(user.setHobbies);
      setLocation(user.location);
      setPortfolioSite(user.portfolioSite);
      setGithub(user.githubLink);
      setTwitter(user.twitterLink);
      setLinkedIn(user.linkedInLink);
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

  //try to have an id based on the languages

  const [programmingLanguages] = useState([
    "Java",
    "JavaScript",
    "Python",
    "Swift",
    "React",
    "Angular",
    "Php",
  ]);

  //handles top programming lnaguages known
  const handleUpdateLanguages = () => {
    if (top3Languages.length > 0) {
      updateTopThreeLanguages(top3Languages);
      return window.alert("Successfully updated your top 3 languages");
    }
    window.alert("You must have at least one language selected.");
  };
  //handles education
  const handleUpdateOccupation = () => {
    if (occupation !== "") {
      updateOccupation(occupation);
      return window.alert("Successfully Updated your Occupation");
    }
    window.alert("Cannot Update your occupation if it is empty.");
  };
  //handles education
  const handleUpdateEducation = () => {
    if (education !== "") {
      updateEducation(education);
      return window.alert("Successfully Updated your Education.");
    }
    window.alert("Cannot Update your education if it is empty.");
  };

  //handles hobbies
  const handleUpdateHobbies = () => {
    if (hobbies !== "") {
      updateHobbies(hobbies);
      return window.alert("Successfully Updated your Hobbies.");
    }
    window.alert("Cannot Update your Hobbies if it is empty.");
  };

  //handles location
  const handleUpdateLocation = () => {
    if (location !== "") {
      updateLocation(location);
      return window.alert("Successfully Updated your Location.");
    }
    window.alert("Cannot Update your Location if it is empty.");
  };

  const verifyIsLink = (link) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(portfolioSite);
  };

  //handles portfolio link
  const handleUpdatePortfolioSite = () => {
    const isLinktest = verifyIsLink(portfolioSite);
    if (!isLinktest) {
      return window.alert("Sneaky...You must enter an actual url.");
    }
    updatePortfolioSite(portfolioSite);
    return window.alert("Successfully Updated your portfolio site.");
  };

  //handle github link
  const handleUpdateGithubLink = () => {
    const isLinkTest = verifyIsLink(github);
    if (!isLinkTest) {
      return window.alert("Sneaky...You must enter an actual url.");
    }
    if (github.includes("https://github.com/")) {
      updateGithubLink(github);
      return window.alert("Github has been updated.");
    }
    return window.alert("Sneaky I think not... Please enter a link from Github.");
  };
  //handle twitter link
  const handleUpdateTwitterLink = () => {
    const isLinkTest = verifyIsLink(github);
    if (!isLinkTest) {
      return window.alert("Sneaky...You must enter an actual url.");
    }
    if (twitter.includes("https://twitter.com/")) {
      updateTwitterLink(twitter);
      return window.alert("Twitter link has been updated.");
    }
    return window.alert("Sneaky I think not... Please enter a link from Twitter.");
  };
  //handle linkedIn
  const handleUpdateLinkedInLink = () => {
    const isLinkTest = verifyIsLink(github);
    if (!isLinkTest) {
      return window.alert("Sneaky...You must enter an actual url.");
    }
    if (linkedIn.includes("https://www.linkedin.com/")) {
      updateLinkedInLink(linkedIn);
      return window.alert("LinkedIn link has been updated.");
    }
    return window.alert("Sneaky I think not..., please enter a link from LinkedIn.");
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
        <section className="rounded-lg border border-gray-400 flex flex-col p-3 my-4 text-gray-800">
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
        </section>

        <section className="rounded-lg border border-gray-400 flex flex-col p-3 my-4 text-gray-800">
          <h3 className="text-3xl bg-green-400 p-3">Bio</h3>
          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Occupation</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdateOccupation}
            >
              Update
            </button>
          </div>
          <input
            name="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="Ex) Student, Frontend Dev ...."
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />

          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Education</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdateEducation}
            >
              Update
            </button>
          </div>
          <input
            name="education"
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Education: Ex) BS Computer Science from Berkely"
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />
          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Hobbies</label>
            <button className="mt-3 px-5 py-1 bg-gray-800 text-white" onClick={handleUpdateHobbies}>
              Update
            </button>
          </div>
          <input
            name="hobbies"
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="Hobbies: Ex) Gym, Music, Photography, Graphic Design"
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />
          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Location</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdateLocation}
            >
              Update
            </button>
          </div>
          <input
            name="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location: Ex) San Fransisco "
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />

          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Project</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdatePortfolioSite}
            >
              Update
            </button>
          </div>
          <input
            name="portfolioSite"
            type="url"
            value={portfolioSite}
            onChange={(e) => setPortfolioSite(e.target.value)}
            placeholder="Project: Ex) Enter your portfolio site here."
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />
        </section>

        <section className="rounded-lg border border-gray-400 flex flex-col p-3 my-4 text-gray-800">
          <h3 className="text-4xl bg-blue-300 p-3">Social Links</h3>
          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Github</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdateGithubLink}
            >
              Update
            </button>
          </div>
          <input
            name="occupation"
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/your-username"
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />

          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">Twitter</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdateTwitterLink}
            >
              Update
            </button>
          </div>
          <input
            name="twitter"
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="https://github.com/your-username"
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />
          <div className="p-3 flex justify-between items-center">
            <label className="font-bold text-2xl">LinkedIn</label>
            <button
              className="mt-3 px-5 py-1 bg-gray-800 text-white"
              onClick={handleUpdateLinkedInLink}
            >
              Update
            </button>
          </div>
          <input
            name="linkedIn"
            type="text"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            placeholder="https://www.linkedin.com/in/your-username/"
            className="focus:outline-none rounded-lg border border-gray-400 flex flex-col p-3 mb-3 text-gray-800"
          />
        </section>
      </div>
    </section>
  );
};

export default EditProfileSection;
