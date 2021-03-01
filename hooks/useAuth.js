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

  //stores additional info about the user based on what we pass - email, name, birthday, etc
  const createUser = (user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
      })
      .catch((err) => {
        return { err };
      });
  };
  //creates user in authentication in firestore
  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        auth.currentUser.sendEmailVerification();
        //brings data passed into firestore db
        return createUser({ uid: res.user.uid, email, name });
      })
      .catch((err) => {
        setCreateAccountError(err.message);
        return err;
      });
  };

  //sign in
  const signIn = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        getUserAdditionalData(user);
        return res.user;
      })
      .catch((err) => {
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

  const loginWithGoogle = () => {
    return auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        const credentials = credentials.accessToken;
        const user = res.user;
        setUser(user);
      })
      .catch((err) => {
        return { err };
      });
  };

  const logout = () => {
    return auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        return { err };
      });
  };

  return { user, signUp, signIn, loginWithGoogle, logout };
};
