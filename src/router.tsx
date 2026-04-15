import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./features/layout/root-layout";
import DictionaryPage from "./features/dictionary";
import DictionaryWordDetailPage from "./features/dictionary/detail";
import KanjiPage from "./features/kanji";
import LearnPage from "./features/learn";
import GrammarListPage from "./features/grammar";
import GrammarDetailPage from "./features/grammar/detail";
import ReadingListPage from "./features/reading";
import ReadingDetailPage from "./features/reading/detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LearnPage /> },
      { path: "grammar", element: <GrammarListPage /> },
      { path: "grammar/:id", element: <GrammarDetailPage /> },
      { path: "reading", element: <ReadingListPage /> },
      { path: "reading/:id", element: <ReadingDetailPage /> },
      { path: "dictionary", element: <DictionaryPage /> },
      { path: "dictionary/:id", element: <DictionaryWordDetailPage /> },
      { path: "kanji", element: <KanjiPage /> },
    ],
  },
]);
