import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoutesProps {
  authenticated: boolean;
}

export const PrivateRoutes: FC<PrivateRoutesProps> = ({ authenticated }) => {
  if (!authenticated) return <Navigate to='/' />;
  return <Outlet />;
};

export default PrivateRoutes;
