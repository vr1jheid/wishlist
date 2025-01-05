import { useGoogleServices } from "../utils/useGoogleServices.ts";
import { Loader } from "@mantine/core";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export const App = () => {
  const navigate = useNavigate();
  const { inited, needAuth } = useGoogleServices();

  useEffect(() => {
    if (!inited) return;
    if (needAuth) {
      navigate("/auth");
    } else {
      navigate("/wishlist");
    }
  }, [needAuth, inited]);

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      {!inited ? <Loader /> : <Outlet />}
    </div>
  );
};
