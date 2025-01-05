import { GlobalContext } from "app/model/GlobalContext.ts";
import { PropsWithChildren, useState } from "react";

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(null);
  const [needAuth, setNeedAuth] = useState(true);
  return (
    <GlobalContext.Provider value={{ token, setToken, needAuth, setNeedAuth }}>
      {children}
    </GlobalContext.Provider>
  );
};
