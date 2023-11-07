import React, {
  useReducer,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

import { Alert } from "react-native";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId:
    "821500473199-6frpqfhv1vpup5tu8p474lnb7imfsoal.apps.googleusercontent.com",
});

interface User {
  uid: string;
  displayName: string;
  photoURL: string;
  providerId: string;
  createdAt: string;
  lastLoginAt: string;
  email: string;
}

interface ContextInterface {
  loading: boolean;
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
}

const userInitialState = {
  uid: "",
  createdAt: "",
  displayName: "",
  lastLoginAt: "",
  photoURL: "",
  providerId: "",
  email: "",
};

const contextInitialState: ContextInterface = {
  loading: false,
  user: userInitialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  logout: () => {},
  signInWithGoogle: () => Promise.resolve(),
  signInWithFacebook: () => Promise.resolve(),
};

type Action =
  | { type: "LOADING_START" }
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" };

const authReducer = (
  state: Pick<ContextInterface, "loading" | "user">,
  action: Action
) => {
  switch (action.type) {
    case "LOADING_START":
      return {
        ...state,
        loading: true,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

// create context
const AuthContext = React.createContext<ContextInterface>(contextInitialState);

// This hook can be used to access the user info.
export function useAuth(): ContextInterface {
  const context = React.useContext<ContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a Provider");
  }

  return context;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, dispatch] = useReducer(authReducer, contextInitialState);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const dataWeCareAbout: User = {
          uid: user.uid,
          displayName: user.providerData[0].displayName ?? "",
          photoURL: user.providerData[0].photoURL ?? "",
          providerId: user.providerData[0].providerId,
          email: user.providerData[0].email ?? "",
          createdAt: user.metadata.creationTime!,
          lastLoginAt: user.metadata.lastSignInTime!,
        };
        dispatch({ type: "SET_USER", payload: dataWeCareAbout });
      } else {
        // User is signed out
        dispatch({ type: "LOGOUT" });
      }
      setInitialLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      dispatch({ type: "LOADING_START" });
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err: any) {
      console.log("err: ", err);
      Alert.alert(err.message);
      dispatch({ type: "LOGOUT" });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      dispatch({ type: "LOADING_START" });
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      console.log("err: ", err.code);
      Alert.alert(err.message);
      dispatch({ type: "LOGOUT" });
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: "LOADING_START" });
      await auth().signOut();
      if (authState.user?.providerId === "google.com") {
        await GoogleSignin.signOut();
      }
      if (authState.user?.providerId === "facebook.com") {
        LoginManager.logOut();
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      dispatch({ type: "LOADING_START" });
      await GoogleSignin.hasPlayServices();
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (err: any) {
      console.log("google signin err: ", err);
      Alert.alert(err.message);
      dispatch({ type: "LOGOUT" });
    }
  };

  const signInWithFacebook = async () => {
    try {
      dispatch({ type: "LOADING_START" });

      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);
    } catch (err: any) {
      console.log("facebook signin err: ", err);
      Alert.alert(err.message);

      dispatch({ type: "LOGOUT" });
    }
  };

  const value = {
    loading: authState.loading,
    user: authState.user,
    signUp, // register
    signIn, // login
    logout,
    signInWithGoogle,
    signInWithFacebook,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
