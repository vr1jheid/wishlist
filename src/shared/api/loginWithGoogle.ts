export const loginWithGoogle = (token: any) => {
  token.requestAccessToken({ prompt: "consent" });
};
