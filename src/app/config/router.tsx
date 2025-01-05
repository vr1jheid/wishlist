import { createBrowserRouter } from "react-router";
import { App } from "app/ui/App.tsx";
import { LoginPage } from "pages/LoginPage";
import { Suspense } from "react";
import { WishListPageLazy } from "pages/WishlistPage/WishListPageLazy.tsx";
import { Loader } from "@mantine/core";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<Loader color="green" />}>
            <WishListPageLazy />
          </Suspense>
        ),
      },
    ],
  },
]);
