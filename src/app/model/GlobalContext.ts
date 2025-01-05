import { createContext, useContext } from "react";

interface GlobalContextValue {
  token: any;
  setToken: (token: any) => void;
  needAuth: any;
  setNeedAuth: (token: any) => void;
}

export const GlobalContext = createContext<GlobalContextValue>({
  token: null,
  setToken: () => {},
  needAuth: true,
  setNeedAuth: () => {},
});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
