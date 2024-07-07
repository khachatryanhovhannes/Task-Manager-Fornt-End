import { ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface IAuthGuardedRouteItemProps {
  element: ReactNode;
}

function AuthGuardedRouteItem({
  element,
}: IAuthGuardedRouteItemProps): JSX.Element | null {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signIn");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{element}</> : null;
}

export default AuthGuardedRouteItem;
