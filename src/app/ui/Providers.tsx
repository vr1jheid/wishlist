import { reatomContext } from "@reatom/npm-react";
import { MantineProvider } from "@mantine/core";
import { GlobalContextProvider } from "./GlobalContextProvider.tsx";
import { RouterProvider } from "react-router/dom";
import { router } from "app/config/router.tsx";
import { createCtx } from "@reatom/core";
import { createDevtools } from "@reatom/devtools";
import { ModalsProvider } from "@mantine/modals";

const ctx = createCtx();
createDevtools({ ctx });

export const Providers = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <ModalsProvider>
          <GlobalContextProvider>
            <RouterProvider router={router} />
          </GlobalContextProvider>
        </ModalsProvider>
      </MantineProvider>
    </reatomContext.Provider>
  );
};
