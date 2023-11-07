import { useAuth } from "@app/context/auth";
import { Box, Text } from "@app/theme";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { SignInScreenProps } from "@app/navigation/types";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [email, setEmail] = useState("xsyndromex@gmail.com");
  const [password, setPassword] = useState("kT431!");

  const { loading, signIn, signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <Box>
      <Text>ENVIRONMENT: {process.env.NODE_ENV}</Text>
      <TouchableOpacity onPress={() => signIn(email, password)}>
        <Text>LOGIN WITH FIREBASE</Text>
      </TouchableOpacity>
      <Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          disabled={loading}
        />
      </Text>
      <Box>
        <TouchableOpacity onPress={signInWithFacebook}>
          <Text>Sign Up with facebook</Text>
        </TouchableOpacity>
      </Box>
      {loading && <ActivityIndicator size="large" color="tomato" />}
    </Box>
  );
};
