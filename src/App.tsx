import { Box, useColorModeValue } from "@chakra-ui/react";
import Routing from "./navigation";
import "./App.css";
import { useEffect } from "react";
import { getToken } from "./helpers";
import { getUserInfo } from "./redux/thunks/userThunks";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Loader } from "./components";
import { Tokens } from "./models";

function App() {
  const dispatch = useAppDispatch();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const isLoading = useAppSelector((state) => state.users.isLoading);
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated
  );
  useEffect(() => {
    if (getToken(Tokens.accessToken) || getToken(Tokens.refreshToken)) {
      dispatch(getUserInfo());
    }
  }, [isAuthenticated]);

  return isLoading ? (
    <Loader />
  ) : (
    <Box className="App" bg={bgColor} minH={"100vh"} maxH={"100%"}>
      <Routing />
    </Box>
  );
}

export default App;
