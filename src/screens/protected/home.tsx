import { useAuth } from "@app/context/auth";
import { Box, Text } from "@app/theme";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const HomeScreen = () => {
  const { user, logout, loading } = useAuth();
  return (
    <Box flex={1} backgroundColor="primary">
      <Text variant="title">PROTECTED HOME SCREEN</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.providerId}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="tomato" />}
    </Box>
  );
};
