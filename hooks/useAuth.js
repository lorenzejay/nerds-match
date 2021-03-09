import { useState, useEffect, useContext, createContext } from "react";
import { auth, db, googleProvider } from "../utils/firebase";

//initalizing user context, by defaults should be empty
const authContext = createContext({ user: {} });
const { Provider } = authContext;

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  //wraps our app with the user context = gives us who is logged in for our entire app
  return <Provider value={auth}>{children}</Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //stores additional info about the user based on what we pass - email, name, birthday, etc
  const createUser = ({ uid, email, name }) => {
    if (!uid) return;
    //check if there was already a doc inside user collection
    return db
      .collection("users")
      .doc(uid)
      .set({
        uid,
        email,
        name,
        profilePic: null,
        about: null,
        ocupation: null,
        projects: [],
        age: null,
        work: null,
        education: null,
        githubLink: null,
        twitterLink: null,
        linkedInLink: null,
        programmingLanguages: [],
      })
      .then(() => {
        setUser({
          uid,
          email,
          name,
        });
      })
      .catch((err) => {
        setError(err);
        return { err };
      });
  };

  const loginWithGoogle = async () => {
    try {
      const { user } = await auth.signInWithPopup(googleProvider);
      if (user) {
        await createUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
        setError(null);
      }
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  //creates user in authentication in firestore
  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        auth.currentUser.sendEmailVerification();
        //brings data passed into firestore db
        setError(null);
        return createUser({ uid: res.user.uid, email, name });
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };

  //sign in
  const signIn = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        setError(null);
        getUserAdditionalData(user);
        return res.user;
      })
      .catch((err) => {
        setError(err);
        return { err };
      });
  };

  //get the users details
  const getUserAdditionalData = (user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((userData) => {
        //we pass in the data from firestore to the user object
        if (userData.data()) {
          setUser(userData.data());
        }
      });
  };

  //update the users about
  const updateAbout = async (about) => {
    try {
      //makes sure theres a user
      if (user === null) return;
      await db.collection("users").doc(user.uid).update({
        about,
      });
      //should trigger update the things in user once there is update
      getUserAdditionalData(user);
      window.alert("Successfully Updated Your About Section.");
    } catch (error) {
      console.log(error);
    }
  };

  //update profilePicture
  const updateProfilePic = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(toSendPP.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();

    //upload to firestore
    if (user) {
      await db.collection("users").doc(user.uid).update({
        profilePic: fileUrl,
      });
    }
  };

  //sends in an array of three languages
  const updateTopThreeLanguages = async (programmingLanguages) => {
    await db.collection("users").doc(user.uid).update({
      programmingLanguages,
    });
  };

  //if we refresh our data still remains without having to store our userid inside localstorage
  const handleAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getUserAdditionalData(user);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  const logout = () => {
    return auth
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        return { err };
      });
  };

  //what our state has access too from useAuth hook
  return {
    user,
    error,
    signUp,
    signIn,
    loginWithGoogle,
    logout,
    updateAbout,
    updateProfilePic,
    updateTopThreeLanguages,
  };
};
