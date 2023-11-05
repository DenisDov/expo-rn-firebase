import { useAuth } from "@app/context/auth";
import { Box, Text } from "@app/theme";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const HomeScreen = () => {
  const { user, logout, loading } = useAuth();
  return (
    <Box>
      <Text>HOME SCREEN HERE</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.providerId}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="tomato" />}
    </Box>
  );
};
