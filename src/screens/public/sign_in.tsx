import { useAuth } from "@app/context/auth";
import { Box, Text } from "@app/theme";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { SignInScreenProps } from "@app/navigation/types";
import Ionicons from "@expo/vector-icons/Ionicons";

export const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [email, setEmail] = useState("xsyndromex@gmail.com");
  const [password, setPassword] = useState("kT431!");

  const { loading, signIn, signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <Box flex={1} padding="m">
      <Box gap="m">
        <Text>ENVIRONMENT: {process.env.NODE_ENV}</Text>
        <TouchableOpacity onPress={() => signIn(email, password)}>
          <Text>LOGIN WITH EMAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text>REGISTER WITH EMAIL</Text>
        </TouchableOpacity>

        <Ionicons.Button
          name="logo-google"
          backgroundColor="#4385F4"
          onPress={signInWithGoogle}
          disabled={loading}
        >
          Sign Up with Google
        </Ionicons.Button>

        <Ionicons.Button
          name="logo-facebook"
          backgroundColor="#3b5998"
          onPress={signInWithFacebook}
          disabled={loading}
        >
          Sign Up with Facebook
        </Ionicons.Button>

        <Ionicons.Button
          name="logo-apple"
          backgroundColor="#000000"
          // onPress={signInWithApple}
          disabled={loading}
        >
          Sign Up with Apple
        </Ionicons.Button>

        {loading && <ActivityIndicator size="large" color="tomato" />}
      </Box>
    </Box>
  );
};
