import { API_KEY, DISCOVERY_DOC } from "app/const/google.ts";

export const initGapi = () => {
  return new Promise<void>((resolve, reject) => {
    gapi.load("client", async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [DISCOVERY_DOC],
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
};
