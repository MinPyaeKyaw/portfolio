import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./features/layout/root-layout";
import DictionaryPage from "./features/dictionary";
import HomePage from "./features/home";
import KanjiPage from "./features/kanji";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dictionary", element: <DictionaryPage /> },
      { path: "kanji", element: <KanjiPage /> },
    ],
  },
]);
