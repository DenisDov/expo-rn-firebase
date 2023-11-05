import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ProtectedStackParamList = {
  Home: undefined;
};

export type PublicStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  "SignIn"
>;
