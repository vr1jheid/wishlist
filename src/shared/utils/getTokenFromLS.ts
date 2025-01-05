export const getTokenFromLS = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return JSON.parse(token) as {
    access_token: string;
    expires_in: number;
    token_type: string;
    expirationTime: number;
    scope: string;
  };
};
