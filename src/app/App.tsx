import * as React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";
import Home from "./pages/Page2";
import TextSelection from "./pages/TextSelection";

function App() {
  const router = createMemoryRouter([
    {
      path: "/",
      element: (
        <PageWrapper>
          <TextSelection />
        </PageWrapper>
      ),
    },
    {
      path: "/page2",
      element: (
        <PageWrapper>
          <Home />
        </PageWrapper>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
