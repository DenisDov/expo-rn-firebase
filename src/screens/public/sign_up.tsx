import { useAuth } from "@app/context/auth";
import { Box, Text } from "@app/theme";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const SignUpScreen = () => {
  const [email, setEmail] = useState("xsyndromex@gmail.com");
  const [password, setPassword] = useState("kT431!");

  const { loading, signUp } = useAuth();

  return (
    <Box>
      <TouchableOpacity onPress={() => signUp(email, password)}>
        <Text>Register with FIREBASE</Text>
        {loading && <ActivityIndicator size="large" color="tomato" />}
      </TouchableOpacity>
    </Box>
  );
};
