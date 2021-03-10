import { useEffect, useState } from "react";
import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import { useAuth } from "../hooks/useAuth";
import { DiPhp, DiJavascript1, DiPython, DiSwift, DiJava, DiReact } from "react-icons/di";
import { FaDumbbell } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { RiShoppingBagFill } from "react-icons/ri";
import {
  AiFillHome,
  AiOutlineFundProjectionScreen,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useRouter } from "next/router";
import EditProfileSection from "../components/editProfileSection";

const Dashboard = () => {
  const router = useRouter();
  const auth = useAuth();
  const { user } = auth;
  const [editMode, setEditMode] = useState(true);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [location, setLocation] = useState("");
  const [portfolioSite, setPortfolioSite] = useState("");

  //social links
  const [githubLink, setGithubLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");

  const [top3Languages, setTop3Languages] = useState([]);
  const [links, setLinks] = useState({ twitter: "", github: "", linkedIn: "" });

  //if there is a username populate our state with our user profile
  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setAboutMe(user.about);
      setProfilePic(user.profilePic);
      setTop3Languages(user.programmingLanguages);
      setOccupation(user.occupation);
      setEducation(user.education);
      setHobbies(user.hobbies);
      setLocation(user.location);
      setPortfolioSite(user.portfolioSite);
      setGithubLink(user.githubLink);
      setTwitterLink(user.twitterLink);
      setLinkedInLink(user.linkedInLink);
    }
  }, [user]);

  useEffect(() => {
    if (user === null) {
      router.push("/signIn");
    }
  });
  console.log(user);
  return (
    <Layout>
      <PaddingWrapper>
        {user && !editMode ? (
          <main className="flex flex-col items-center justify-center mb-10">
            <section
              className={`flex justify-between w-full px-24 pb-2 border-b border-black border-opacity-10`}
            >
              <button
                onClick={() => setEditMode(true)}
                className={`focus:outline-none ${
                  editMode ? "text-black" : "text-gray-300"
                } outline-none border-none`}
              >
                Edit
              </button>
              <span className="text-gray-200">/</span>
              <button
                onClick={() => setEditMode(false)}
                className={`focus:outline-none ${
                  editMode ? "text-gray-300" : "text-black"
                } outline-none border-none`}
              >
                view
              </button>
            </section>
            <h3 className="float-left font-bold text-2xl w-full mb-3">{username}</h3>
            <img src={profilePic || "default-profile.png"} className="object-cover w-full h-80" />
            <section className="rounded-xl shadow-xl px-5 py-10 w-full">
              <p>About me</p>
              <p className="text-semibold text-2xl">{aboutMe}</p>
            </section>

            <section className="text-2xl flex my-5">
              {top3Languages.map((lang, i) => {
                return (
                  <div key={i} className="text-2xl">
                    {lang.language === "JavaScript" && <DiJavascript1 size={64} />}
                    {lang.language === "Java" && <DiJava size={64} />}
                    {lang.language === "React" && <DiReact size={64} />}
                    {lang.language === "Python" && <DiPython size={64} />}
                    {lang.language === "Php" && <DiPhp size={64} />}
                  </div>
                );
              })}

              {/* <DiPhp size={64} />
              <DiJavascript1 size={64} />
              <DiPython size={64} /> */}
            </section>

            <ul className="rounded-xl shadow-xl px-2  py-8 w-full mb-20 text-xl">
              {occupation && (
                <li className="border-t-2 border-opacity-10 p-5 flex items-center">
                  <RiShoppingBagFill className="mr-4" /> {occupation}
                </li>
              )}
              {education && (
                <li className="border-t-2 border-opacity-10 p-5 flex items-center">
                  <IoIosSchool className="mr-4" /> {education}
                </li>
              )}
              {user.hobbies !== null && (
                <li className="border-t-2 border-opacity-10 p-5 flex items-center">
                  <FaDumbbell className="mr-4" /> {hobbies}
                </li>
              )}
              {portfolioSite !== "" && (
                <li className="border-t-2 border-opacity-10 p-5 flex items-center">
                  <AiOutlineFundProjectionScreen className="mr-4" />
                  <a href={portfolioSite}>{portfolioSite}</a>
                </li>
              )}
              {location !== "" && (
                <li className="border-t-2 border-opacity-10 p-5 flex items-center">
                  <AiFillHome className="mr-4" />
                  {location}
                </li>
              )}
            </ul>

            <ul className="flex justify-around w-full">
              {githubLink && (
                <li>
                  <a href={githubLink} target="_blank" rel="noopener noreferrer">
                    <AiOutlineGithub size={44} />
                  </a>
                </li>
              )}
              {linkedInLink && (
                <li>
                  <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
                    <AiOutlineLinkedin size={44} />
                  </a>
                </li>
              )}
              {twitterLink && (
                <li>
                  <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                    <AiOutlineTwitter size={44} />
                  </a>
                </li>
              )}
            </ul>
          </main>
        ) : (
          user &&
          editMode && (
            <>
              <section
                className={`flex justify-between w-full px-24 pb-2 border-b border-black border-opacity-10`}
              >
                <button
                  onClick={() => setEditMode(true)}
                  className={`focus:outline-none ${
                    editMode ? "text-black" : "text-gray-300"
                  } outline-none border-none`}
                >
                  Edit
                </button>
                <span className="text-gray-200">/</span>
                <button
                  onClick={() => setEditMode(false)}
                  className={`focus:outline-none ${
                    editMode ? "text-gray-300" : "text-black"
                  } outline-none border-none`}
                >
                  view
                </button>
              </section>
              <EditProfileSection />
            </>
          )
        )}
      </PaddingWrapper>
    </Layout>
  );
};

export default Dashboard;
