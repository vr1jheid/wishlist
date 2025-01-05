import { CLIENT_ID, SCOPES } from "app/const/google.ts";

export const initGis = (onLogin?: () => void) => {
  // @ts-ignore
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (token: any) => {
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...token,
          expirationTime: Date.now() + token.expires_in * 1000,
        }),
      );
      onLogin?.();
    },
  });
  return tokenClient;
};
