import { Button } from "@mantine/core";
import { loginWithGoogle } from "shared/api/loginWithGoogle.ts";
import { useGlobalContext } from "app/model/GlobalContext.ts";

export const LoginPage = () => {
  const { token } = useGlobalContext();
  return (
    <Button onClick={() => loginWithGoogle(token)}>LOG in with Google</Button>
  );
};
