import { useAppSelector } from "../index";

function useAuth() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.users);
  if (!isAuthenticated && isLoading) {
    return false;
  } else {
    return true;
  }
}

export default useAuth;
