import { useEffect, useLayoutEffect, useState } from "react";
import { getTokenFromLS } from "shared/utils/getTokenFromLS.ts";
import { api } from "shared/api";
import { useGlobalContext } from "../model/GlobalContext.ts";

export const useGoogleServices = () => {
  const { setNeedAuth, needAuth, setToken } = useGlobalContext();
  const [inited, setInited] = useState(false);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    setToken(api.initGis(() => setNeedAuth(false)));
  }, []);

  useEffect(() => {
    api
      .initGapi()
      .then(() => {
        const token = getTokenFromLS();
        if (token && token.expirationTime > Date.now()) {
          gapi.client.setToken(token);
          setNeedAuth(false);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setInited(true));
  }, []);

  return { needAuth, inited, isError };
};
